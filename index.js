const clearDir = require('./src/lib')

const CONST = require('./config.json')

const DIST_DIR = CONST.dist_dir_path
const NODE_MODULES = CONST.dist_dir_name
const LIMIT_SIZE = CONST.dist_dir_size

clearDir(DIST_DIR)
