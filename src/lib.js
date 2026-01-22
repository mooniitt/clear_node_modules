const fs = require("fs");
const path = require("path");
const { rimraf } = require("rimraf");
const ora = require("ora");

// 格式化文件大小
function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + " MB";
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";
}

function getDirSize(dir) {
  let total = 0;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      try {
        if (entry.isSymbolicLink()) {
          continue;
        } else if (entry.isDirectory()) {
          total += getDirSize(fullPath);
        } else if (entry.isFile()) {
          total += fs.statSync(fullPath).size;
        }
      } catch (e) {
        continue;
      }
    }
  } catch (e) {
    // 目录不可读
  }
  return total;
}

function wrap(LIMIT_SIZE, NODE_MODULES) {
  return async function clearDir(dirPath) {
    const foldersToDelete = [];
    let totalFreed = 0;
    let skippedCount = 0;

    // 扫描阶段
    const scanSpinner = ora("🔍 Scanning for node_modules...").start();
    
    function scan(pathToScan) {
      try {
        if (!fs.existsSync(pathToScan)) return;
        const stat = fs.lstatSync(pathToScan);
        if (!stat.isDirectory() || stat.isSymbolicLink()) return;
        
        const entries = fs.readdirSync(pathToScan, { withFileTypes: true });
        for (const entry of entries) {
          const subPath = path.join(pathToScan, entry.name);
          try {
            if (entry.isSymbolicLink()) continue;
            if (entry.name === NODE_MODULES && entry.isDirectory()) {
              const size = getDirSize(subPath);
              foldersToDelete.push({ path: subPath, size });
            } else if (entry.isDirectory()) {
              scan(subPath);
            }
          } catch (e) {
            continue;
          }
        }
      } catch (e) {
        // 忽略
      }
    }

    scan(dirPath);
    
    if (foldersToDelete.length === 0) {
      scanSpinner.info("No node_modules found.");
      return;
    }
    
    scanSpinner.succeed(`Found ${foldersToDelete.length} node_modules folder(s)`);
    console.log("");

    // 串行删除，避免进度混乱
    const total = foldersToDelete.length;
    for (let i = 0; i < foldersToDelete.length; i++) {
      const { path: folderPath, size } = foldersToDelete[i];
      const sizeMB = size / 1024 / 1024;
      const progress = `[${i + 1}/${total}]`;
      
      if (sizeMB < LIMIT_SIZE) {
        skippedCount++;
        console.log(`  ⏭️  ${progress} Skipped (${formatSize(size)}) ${folderPath}`);
        continue;
      }

      const spinner = ora({
        text: `${progress} Removing ${formatSize(size)} - ${folderPath}`,
        prefixText: "  "
      }).start();
      
      try {
        await rimraf(folderPath);
        totalFreed += size;
        spinner.succeed(`${progress} Freed ${formatSize(size)} - ${folderPath}`);
      } catch (err) {
        spinner.fail(`${progress} Failed - ${folderPath}: ${err.message}`);
      }
    }
    
    // 汇总信息
    console.log("");
    console.log("─".repeat(50));
    console.log(`  ✨ Completed!`);
    console.log(`     📁 Total: ${total} folder(s)`);
    if (skippedCount > 0) {
      console.log(`     ⏭️  Skipped: ${skippedCount}`);
    }
    console.log(`     💾 Freed: ${formatSize(totalFreed)}`);
    console.log("─".repeat(50));
  };
}

async function clearFunc(
  disDir = "./",
  LIMIT_SIZE = 0,
  NODE_MODULES = "node_modules"
) {
  console.log("");
  console.log("🧹 Clear Node Modules");
  console.log("─".repeat(50));
  console.log(`  📂 Target: ${path.resolve(disDir)}`);
  if (LIMIT_SIZE > 0) {
    console.log(`  📏 Min size: ${LIMIT_SIZE} MB`);
  }
  console.log("─".repeat(50));
  console.log("");
  
  const clearDir = wrap(LIMIT_SIZE, NODE_MODULES);
  await clearDir(path.resolve(disDir));
  console.log("");
}

module.exports = clearFunc;
