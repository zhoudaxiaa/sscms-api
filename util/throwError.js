/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 统一的错误抛出处理
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-25 10:52:42
 * @LastEditTime: 2019-04-25 14:49:00
 */
/**
 * @description: 响应错误抛出
 * @param {Object} ctx ctx 对象 
 * @param {Number} status 状态码 
 * @param {Number} code 错误码 
 * @param {String} msg 错误信息
 * @return: 
 */
function reqThrowError (ctx, status = 400, code = 9999, msg) {
  ctx.status = status
  ctx.body = { 
    code,
    msg: msg || 'unkown fail'
  }
}

module.exports = {
  reqThrowError
}