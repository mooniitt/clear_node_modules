const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const chalk = require('chalk')

const noop = () => {}

function wrap(LIMIT_SIZE, NODE_MODULES) {
  return function clearDir(disDir) {
    const p = path.resolve(disDir)
    if (!fs.statSync(p).isDirectory()) return
    if (!fs.readdirSync(p).length) return
    const { size } = fs.statSync(p)
    if (size / 1024 < LIMIT_SIZE) return
    const dirList = fs.readdirSync(p)
    dirList.forEach(dir => {
      const subP = path.resolve(p, dir)
      if (dir === NODE_MODULES) {
        rimraf(subP, noop)
        console.log(`${path.resolve(__filename, subP)} ${chalk.green('Done!')}`)
        return
      }
      clearDir(subP)
    })
  }
}

function clearFunc(disDir = './', LIMIT_SIZE = 0, NODE_MODULES = 'node_modules') {
  console.log('')
  wrap(LIMIT_SIZE, NODE_MODULES)(disDir)
  console.log('')
}

module.exports = clearFunc
