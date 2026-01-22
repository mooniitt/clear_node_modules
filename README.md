# clear_node_modules

🧹 Recursively remove all `node_modules` folders from your projects to free up disk space.

[![npm version](https://img.shields.io/npm/v/clear_node_modules.svg)](https://www.npmjs.com/package/clear_node_modules)
[![npm downloads](https://img.shields.io/npm/dm/clear_node_modules.svg)](https://www.npmjs.com/package/clear_node_modules)

## ✨ Features

- 🔍 Recursively scans and deletes all `node_modules` folders
- 📏 Optional size limit - only delete folders larger than N MB
- 📊 Beautiful progress display with real-time scanning stats
- 💾 Shows total freed disk space
- 🚀 Zero config - just run and go!

---

<details open>
<summary><strong>English</strong></summary>
<br>

## 🚀 Quick Start (npx)

No installation required! Just run:

```bash
npx clear_node_modules@latest
```

This will scan the current directory and all subdirectories for `node_modules` and delete them.

## 📦 Installation (Global)

```bash
npm install -g clear_node_modules
```

After global install, you can use the shorter `cnm` command:

```bash
cnm
```

## 📖 Usage

```bash
npx clear_node_modules@latest [path] [limit] [folder]
```

### Arguments

| Argument | Description                  | Default           |
| -------- | ---------------------------- | ----------------- |
| `path`   | Target directory to scan     | Current directory |
| `limit`  | Minimum size in MB to delete | 0 (delete all)    |
| `folder` | Folder name to delete        | `node_modules`    |

### Examples

```bash
# Delete all node_modules in current directory
npx clear_node_modules@latest

# Delete all node_modules in a specific directory
npx clear_node_modules@latest ~/projects

# Only delete node_modules larger than 100MB
npx clear_node_modules@latest ./ 100

# Delete a custom folder name
npx clear_node_modules@latest ./ 0 dist
```

## 📺 Output Example

```
🧹 Clear Node Modules
──────────────────────────────────────────────────
  📂 Target: /Users/you/projects
──────────────────────────────────────────────────

✔ Scanned 1234 dirs, found 5 node_modules

  ✔ [1/5] Freed 234.5 MB - /path/to/project1/node_modules
  ✔ [2/5] Freed 567.8 MB - /path/to/project2/node_modules
  ⏭️ [3/5] Skipped (12.3 MB) /path/to/small-project/node_modules
  ...

──────────────────────────────────────────────────
  ✨ Completed!
     📁 Total: 5 folder(s)
     💾 Freed: 1.2 GB
──────────────────────────────────────────────────
```

</details>

---

<details>
<summary><strong>中文 (Chinese)</strong></summary>
<br>

## 🚀 快速开始 (npx)

无需安装，直接运行：

```bash
npx clear_node_modules@latest
```

这会扫描当前目录及所有子目录中的 `node_modules` 并删除它们。

## 📦 全局安装

```bash
npm install -g clear_node_modules
```

全局安装后可以使用更短的 `cnm` 命令：

```bash
cnm
```

## 📖 使用方法

```bash
npx clear_node_modules@latest [路径] [大小限制] [文件夹名]
```

### 参数说明

| 参数       | 描述               | 默认值         |
| ---------- | ------------------ | -------------- |
| `路径`     | 要扫描的目标目录   | 当前目录       |
| `大小限制` | 最小删除大小 (MB)  | 0 (删除所有)   |
| `文件夹名` | 要删除的文件夹名称 | `node_modules` |

### 使用示例

```bash
# 删除当前目录下的所有 node_modules
npx clear_node_modules@latest

# 删除指定目录下的所有 node_modules
npx clear_node_modules@latest ~/projects

# 只删除大于 100MB 的 node_modules
npx clear_node_modules@latest ./ 100

# 删除自定义文件夹名
npx clear_node_modules@latest ./ 0 dist
```

</details>

---

## 📄 License

MIT
