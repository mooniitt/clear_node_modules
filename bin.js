#!/usr/bin/env node

const path = require("path");
const clearDir = require("./src/lib");

const { version } = require("./package.json");

const args = process.argv.slice(2);

// 版本信息
if (args.includes("-v") || args.includes("--version")) {
  console.log(`cnm v${version}`);
  process.exit(0);
}

// 帮助信息
const isHelp = args.some((arg) => /^(-+|\/)(h(elp)?|\?)$/.test(arg));

if (isHelp) {
  console.log(`
cnm v${version} - Clear Node Modules

Usage: npx cnms [path] [limit] [folder]

Arguments:
  path    Target directory (default: current directory)
  limit   Minimum size in MB to delete (default: 0)
  folder  Folder name to delete (default: node_modules)

Examples:
  npx cnms              # Clear all node_modules in current dir
  npx cnms ./projects   # Clear in specific directory
  npx cnms ./ 100       # Only delete if > 100MB

After global install (npm i -g cnms):
  cnm                   # Same as above, shorter command
`);
  process.exit(0);
}

// 默认配置
const DIST_DIR = path.resolve(process.cwd(), args[0] || "./");
const LIMIT_SIZE = args[1] || 0;
const NODE_MODULES = args[2] || "node_modules";

clearDir(DIST_DIR, LIMIT_SIZE, NODE_MODULES);
