# clear_node_modules

一个用于清理项目中所有 `node_modules` 目录的命令行工具。

## 功能特点

- 递归查找并删除指定目录下的所有 `node_modules` 文件夹
- 支持设置文件大小限制
- 支持指定目标目录
- 简单易用的命令行界面

## 安装

```bash
npm install clear_node_modules -g
```

## 使用方法

```bash
cnm <path> [limit] [dist-directory]
```

### 参数说明

- `path`: 要清理的目录路径（必填）
- `limit`: 文件大小限制，单位为 MB（可选）
- `dist-directory`: 目标目录（可选）

### 使用示例

1. 清理指定目录下的所有 `node_modules`：
```bash
cnm /Users/username/projects
```

2. 设置文件大小限制（例如：只删除大于 100MB 的 node_modules）：
```bash
cnm /Users/username/projects 100
```

3. 指定目标目录：
```bash
cnm /Users/username/projects 100 /path/to/backup
```

## 注意事项

- 使用前请确保已备份重要数据
- 建议在清理前先确认目录路径是否正确
- 使用 `pwd` 命令可以获取当前目录的完整路径

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

```
cnm <path> <limit(mb)> <dist-directory>
```

## example

```
npm i clear_node_modules -g
```

then specified the directory that all node_modules directory under this directory you want remove!

you can use 'pwd' get the path like '/Users/taobeer/demo'

```
cnm /Users/taobeer/demo
```
