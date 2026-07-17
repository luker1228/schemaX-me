import { access, copyFile, mkdir } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const [slug, ...titleParts] = process.argv.slice(2);
const title = titleParts.join(" ").trim();

if (!slug || !title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('Usage: npm run new:guide -- <kebab-case-slug> "标题"');
  process.exit(1);
}

const root = process.cwd();
const templatePath = path.join(root, "src/howto/manuals/guide/template.md");
const targetDir = path.join(root, "src/content/guides");
const targetPath = path.join(targetDir, `${slug}.md`);

try {
  await access(targetPath, constants.F_OK);
  console.error(`Guide already exists: ${targetPath}`);
  process.exit(1);
} catch {
  await mkdir(targetDir, { recursive: true });
  await copyFile(templatePath, targetPath);
  const { readFile, writeFile } = await import("node:fs/promises");
  const source = await readFile(targetPath, "utf8");
  await writeFile(targetPath, source.replaceAll("{{TITLE}}", title));
  console.log(`Created ${path.relative(root, targetPath)}`);
}
