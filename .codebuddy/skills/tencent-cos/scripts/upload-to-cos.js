#!/usr/bin/env node

/**
 * 腾讯云 COS 上传脚本
 * 支持单个文件上传和批量 Markdown 图片上传
 */

const fs = require('fs');
const path = require('path');
const COS = require('cos-nodejs-sdk-v5');

// 从 .env 读取配置
function loadEnv() {
  // 优先从当前工作目录查找 .env，然后向上查找直到项目根目录
  let envPath = path.join(process.cwd(), '.env');

  // 如果当前目录没有 .env，尝试向上查找（最多 5 层）
  if (!fs.existsSync(envPath)) {
    let currentDir = process.cwd();
    for (let i = 0; i < 5; i++) {
      const parentDir = path.resolve(currentDir, '..');
      const parentEnvPath = path.join(parentDir, '.env');
      if (fs.existsSync(parentEnvPath)) {
        envPath = parentEnvPath;
        break;
      }
      if (parentDir === currentDir) break; // 到达根目录
      currentDir = parentDir;
    }
  }

  const config = {};

  if (fs.existsSync(envPath)) {
    console.log(`读取配置: ${envPath}`);
    const content = fs.readFileSync(envPath, 'utf-8');
    content.split('\n').forEach(line => {
      // 跳过空行和注释
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) return;

      // 支持 key=value 或 key:value 格式
      const match = trimmedLine.match(/^([^=:]+)[:=](.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        config[key] = value;
        console.log(`  已读取: ${key}`);
      }
    });
  } else {
    console.warn('警告: 未找到 .env 文件');
  }

  console.log('配置内容:', { 
    secretId: config.secretId ? '已设置' : '未设置', 
    secretKey: config.secretKey ? '已设置' : '未设置',
    bucket: config.bucket || '使用默认',
    region: config.region || '使用默认'
  });

  return {
    secretId: config.secretId || process.env.COS_SECRET_ID,
    secretKey: config.secretKey || process.env.COS_SECRET_KEY,
    bucket: config.bucket || process.env.COS_BUCKET || 'luke-1307356219',
    region: config.region || process.env.COS_REGION || 'ap-chongqing'
  };
}

// 上传单个文件到 COS
async function uploadFile(localPath, cosKey) {
  const config = loadEnv();

  if (!config.secretId || !config.secretKey) {
    throw new Error('缺少 COS 配置，请在 .env 中设置 COS_SECRET_ID 和 COS_SECRET_KEY');
  }

  const cos = new COS({
    SecretId: config.secretId,
    SecretKey: config.secretKey
  });

  const bucket = config.bucket;
  const region = config.region;

  // 如果没有指定 cosKey，使用文件名
  if (!cosKey) {
    cosKey = 'articles/' + path.basename(localPath);
  }

  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket: bucket,
      Region: region,
      Key: cosKey,
      Body: fs.createReadStream(localPath)
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const url = `https://${bucket}.cos.${region}.myqcloud.com/${cosKey}`;
        resolve({ url, key: cosKey });
      }
    });
  });
}

// 处理 Markdown 文件中的图片
async function processMarkdown(mdPath) {
  const config = loadEnv();
  const content = fs.readFileSync(mdPath, 'utf-8');
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;

  let newContent = content;
  const uploads = [];
  let match;

  while ((match = imageRegex.exec(content)) !== null) {
    const [fullMatch, altText, imagePath] = match;

    // 跳过已经是网络图片的链接
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      continue;
    }

    // 处理相对路径
    const absolutePath = path.resolve(path.dirname(mdPath), imagePath);

    if (!fs.existsSync(absolutePath)) {
      console.warn(`警告: 图片文件不存在: ${absolutePath}`);
      continue;
    }

    // 生成 COS 对象键
    const relativeToCwd = path.relative(process.cwd(), absolutePath);
    const cosKey = relativeToCwd.replace(/\\/g, '/');

    uploads.push({
      localPath: absolutePath,
      cosKey,
      originalMarkdownPath: imagePath,
      altText
    });
  }

  // 上传所有图片
  for (const upload of uploads) {
    try {
      console.log(`上传: ${upload.localPath} -> ${upload.cosKey}`);
      const { url } = await uploadFile(upload.localPath, upload.cosKey);

      // 替换 Markdown 中的链接
      const escapedOriginal = upload.originalMarkdownPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`!\\[${upload.altText}\\]\\(${escapedOriginal}\\)`, 'g');
      newContent = newContent.replace(regex, `![${upload.altText}](${url})`);

      console.log(`  ✓ 上传成功: ${url}`);
    } catch (err) {
      console.error(`  ✗ 上传失败: ${err.message}`);
    }
  }

  // 备份原文件
  const backupPath = mdPath + '.bak';
  fs.copyFileSync(mdPath, backupPath);
  console.log(`\n备份原文件到: ${backupPath}`);

  // 写入新内容
  fs.writeFileSync(mdPath, newContent, 'utf-8');
  console.log(`已更新 Markdown 文件: ${mdPath}`);

  return uploads.length;
}

// 主函数
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('用法:');
    console.log('  上传单个文件: node upload-to-cos.js <本地文件路径> [COS对象键]');
    console.log('  处理 Markdown: node upload-to-cos.js --markdown <markdown文件路径>');
    process.exit(1);
  }

  try {
    if (args[0] === '--markdown') {
      const mdPath = args[1];
      if (!mdPath) {
        throw new Error('请指定 Markdown 文件路径');
      }
      const count = await processMarkdown(mdPath);
      console.log(`\n完成！共处理 ${count} 张图片`);
    } else {
      const localPath = args[0];
      const cosKey = args[1];
      const { url } = await uploadFile(localPath, cosKey);
      console.log(`\n上传成功！`);
      console.log(`URL: ${url}`);
    }
  } catch (err) {
    console.error(`错误: ${err.message}`);
    process.exit(1);
  }
}

main();
