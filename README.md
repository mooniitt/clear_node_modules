# clear_node_modules (English)

A command-line tool to delete all `node_modules` directories within a specified path.

## Features

- Recursively finds and deletes all `node_modules` folders.
- Allows setting a size limit to only delete `node_modules` larger than a certain size.
- Simple and easy-to-use command-line interface.

## Installation

```bash
npm install clear_node_modules -g
```

## Usage

```bash
cnm <path> [limit]
```

### Arguments

- `path`: The directory path to clean up (required).
- `limit`: The size limit in MB. Only `node_modules` directories larger than this size will be deleted (optional).

### Examples

1.  Delete all `node_modules` in the current directory:

    ```bash
    cnm .
    ```

2.  Delete all `node_modules` in a specific directory:

    ```bash
    cnm /path/to/your/projects
    ```

3.  Delete all `node_modules` larger than 100MB in a specific directory:

    ```bash
    cnm /path/to/your/projects 100
    ```

## License

MIT

---

# clear_node_modules (中文)

一个用于清理指定路径下所有 `node_modules` 目录的命令行工具。

## 功能特点

- 递归查找并删除所有 `node_modules` 文件夹。
- 支持设置大小限制，只删除大于特定大小的 `node_modules`。
- 简单易用的命令行界面。

## 安装

```bash
npm install clear_node_modules -g
```

## 使用方法

```bash
cnm <path> [limit]
```

### 参数说明

- `path`: 要清理的目录路径 (必需)。
- `limit`: 文件大小限制 (单位 MB)。只有大于此大小的 `node_modules` 目录才会被删除 (可选)。

### 使用示例

1.  删除当前目录下的所有 `node_modules`：

    ```bash
    cnm .
    ```

2.  删除指定目录下的所有 `node_modules`：

    ```bash
    cnm /path/to/your/projects
    ```

3.  删除指定目录下所有大于 100MB 的 `node_modules`：

    ```bash
    cnm /path/to/your/projects 100
    ```

## 许可证

MIT
