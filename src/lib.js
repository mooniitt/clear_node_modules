const fs = require('fs')
const rimraf = require('rimraf')
const path = require('path')

const noop = () => {}

function wrap(LIMIT_SIZE, NODE_MODULES) {
  return function clearDir(disDir) {
    const p = path.resolve(disDir)
    if (!fs.statSync(p).isDirectory()) return
    if (!fs.readdirSync(p).length) return
    const { size } = fs.statSync(p)
    if (size < LIMIT_SIZE) return
    const dirList = fs.readdirSync(p)
    dirList.forEach(dir => {
      const subP = path.resolve(p, dir)
      if (dir === NODE_MODULES) {
        rimraf(subP, noop)
        return
      }
      clearDir(subP)
    })
  }
}

function clearFunc(disDir = './', LIMIT_SIZE = 0, NODE_MODULES = 'node_modules') {
  return wrap(LIMIT_SIZE, NODE_MODULES)(disDir)
}

module.exports = clearFunc
