const { formatRes, formatError } = require('./formatLog')
const log4js = require('log4js')
const logConfig = require('../config/log4js.json')

log4js.configure(logConfig)

let logger = {}

let resLogger = log4js.getLogger('response')
let errorLogger = log4js.getLogger('error')

// 封装响应日志
logger.resLogger = (ctx, resTime) => {
  // if(ctx) {
    resLogger.info(formatRes(ctx, resTime))
  // }
}

// 封装错误日志
logger.errLogger = (ctx, err, resTime) => {
  if(ctx && err) {
    errorLogger.error(formatError(ctx, err, resTime))
  }
}

module.exports = logger