---
name: tencent-cos
description: 上传文件到腾讯云 COS（对象存储）。当用户需要上传图片或其他文件到 COS、需要替换 Markdown 中的本地图片链接为 COS 链接、或询问如何发布文章图片时使用此技能。支持从 .env 读取 SecretId、SecretKey，自动生成 COS URL。
---

# 腾讯云 COS 上传技能

用于将本地文件（尤其是文章图片）上传到腾讯云 COS，并返回可访问的 URL。

## 环境变量配置

在项目的 `.env` 文件中配置以下变量（注意格式）：

```bash
# 腾讯云 COS 配置（项目使用的格式）
secretId=AKIDxxxxxxxxxxxxxxxxxxxx
secretKey=xxxxxxxxxxxxxxxxxxxx
```

**重要**：
- 项目 `.env` 文件使用 `key=value` 格式（无 `COS_` 前缀，无空格）
- `secretId` 和 `secretKey` 是腾讯云 API 密钥的标识符
- Bucket 和 Region 在脚本中默认为 `luke-1307356219` 和 `ap-chongqing`
- 如果需要覆盖默认值，可以在 `.env` 中添加 `bucket` 和 `region`

## 使用方式

### 1. 上传单个文件

```bash
node scripts/upload-to-cos.js <本地文件路径> [COS对象键]
```

示例：
```bash
# 使用自动生成的对象键（基于文件名）
node scripts/upload-to-cos.js ./images/photo.png

# 指定 COS 对象键
node scripts/upload-to-cos.js ./images/photo.png articles/2024/photo.png
```

### 2. 批量上传 Markdown 文章中的图片

```bash
node scripts/upload-to-cos.js --markdown <markdown文件路径>
```

此命令会：
1. 扫描 Markdown 文件中的所有本地图片链接
2. 将图片上传到 COS
3. 自动替换 Markdown 中的链接为 COS URL
4. 保存修改后的文件（原文件备份为 `.bak`）

## COS URL 格式

上传成功后，文件可通过以下格式访问：

```
https://<bucket>.cos.<region>.myqcloud.com/<对象键>
```

示例：
```
https://luke-1307356219.cos.ap-chongqing.myqcloud.com/articles/2024/photo.png
```

## 对象键命名规范

为了保持文件组织有序，建议按以下规则生成对象键：

1. **文章图片**：`articles/<文章目录>/<图片名>`
2. **公共资源**：`public/<资源类型>/<文件名>`
3. **临时文件**：`temp/<日期>/<文件名>`

示例：
- 文章 `ai-思考/花了6个月我到底做了个什么/窜了个大活儿.md` 中的图片：
  - `articles/ai-思考/花了6个月我到底做了个什么/mcclient使用图.png`
  - `articles/ai-思考/花了6个月我到底做了个什么/开放文档使用.png`

## 执行流程

当用户请求上传文件到 COS 时：

1. **读取配置**：从 `.env` 文件读取 `COS_SECRET_ID`、`COS_SECRET_KEY`、`COS_BUCKET`、`COS_REGION`
2. **检查文件**：确认要上传的本地文件存在
3. **生成对象键**：根据命名规范生成 COS 对象键
4. **执行上传**：运行 `scripts/upload-to-cos.js`
5. **返回结果**：输出 COS URL，如果是 Markdown 文件则自动替换链接
6. **验证**：确认文件可通过 URL 访问

## 注意事项

- 确保 `.env` 文件已添加到 `.gitignore`，避免密钥泄露
- 上传前检查文件大小，单个文件不超过 5GB
- 如果 bucket 启用了 CDN 加速，可使用 CDN 域名替代 COS 默认域名
- 默认上传的文件为公开读权限，如需私有访问需修改脚本
