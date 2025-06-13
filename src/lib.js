const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const ora = require("ora");
const { promisify } = require("util");

const rimrafAsync = promisify(rimraf);

function getDirSize(dir) {
  let total = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      total += getDirSize(fullPath);
    } else {
      total += fs.statSync(fullPath).size;
    }
  }
  return total;
}

function wrap(LIMIT_SIZE, NODE_MODULES) {
  return async function clearDir(dirPath) {
    const tasks = [];
    let totalCount = 0;
    let doneCount = 0;

    // 先扫描一次，预估总数
    function scan(pathToScan) {
      if (!fs.existsSync(pathToScan) || !fs.statSync(pathToScan).isDirectory())
        return;
      const entries = fs.readdirSync(pathToScan);
      for (const entry of entries) {
        const subPath = path.join(pathToScan, entry);
        if (entry === NODE_MODULES && fs.existsSync(subPath)) {
          totalCount++;
        } else if (fs.statSync(subPath).isDirectory()) {
          scan(subPath);
        }
      }
    }

    scan(dirPath);

    async function recurse(currentPath) {
      if (
        !fs.existsSync(currentPath) ||
        !fs.statSync(currentPath).isDirectory()
      )
        return;

      const entries = fs.readdirSync(currentPath);
      if (entries.length === 0) return;

      const dirSize = getDirSize(currentPath);
      if (dirSize / 1024 < LIMIT_SIZE) return;

      for (const entry of entries) {
        const subPath = path.join(currentPath, entry);
        if (entry === NODE_MODULES && fs.statSync(subPath).isDirectory()) {
          const spinner = ora(
            `(${++doneCount}/${totalCount}) Removing ${subPath}`
          ).start();
          const task = rimrafAsync(subPath)
            .then(() =>
              spinner.succeed(`(${doneCount}/${totalCount}) Done ${subPath}`)
            )
            .catch((err) =>
              spinner.fail(
                `(${doneCount}/${totalCount}) Failed ${subPath}: ${err.message}`
              )
            );
          tasks.push(task);
        } else if (fs.statSync(subPath).isDirectory()) {
          await recurse(subPath);
        }
      }
    }

    await recurse(dirPath);
    await Promise.all(tasks);
  };
}

async function clearFunc(
  disDir = "./",
  LIMIT_SIZE = 0,
  NODE_MODULES = "node_modules"
) {
  console.log("");
  const clearDir = wrap(LIMIT_SIZE, NODE_MODULES);
  await clearDir(path.resolve(disDir));
  console.log("\nAll done!\n");
}

module.exports = clearFunc;
