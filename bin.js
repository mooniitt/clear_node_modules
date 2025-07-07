#!/usr/bin/env node

const path = require("path");
const config = require("./config.json");
const clearDir = require("./src/lib");

const { version } = require("../package.json");

const args = process.argv.slice(2);

if (args.includes("-v") || args.includes("--version")) {
  console.log(`cnm v${version}`);
  process.exit(0);
}

const log = console.log;

const DIST_DIR = path.resolve(process.cwd(), args[0] || config.dist_dir_path);
const LIMIT_SIZE = args[1] || config.dist_dir_size;
const NODE_MODULES = args[2] || config.dist_dir_name;

let isHelp = false;

args.forEach((arg) => {
  if (arg.match(/^(-+|\/)(h(elp)?|\?)$/)) isHelp = true;
});

if (args.length < 1) isHelp = true;

if (isHelp) {
  log("");
  log("useage: cnm <path> <limit(mb)> <distDir>");
  log("");
  log("  delete the specified folder!");
  log("");
  process.exit(1);
}

clearDir(DIST_DIR, LIMIT_SIZE, NODE_MODULES);
