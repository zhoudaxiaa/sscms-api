/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 统一错误处理，响应输出
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-28 10:27:33
 * @LastEditTime: 2019-04-28 12:24:33
 */
/**
 * @description: 响应错误抛出
 * @param {Object} ctx ctx 对象 
 * @param {Number} status 状态码 
 * @param {Number} code 错误码 
 * @param {String} msg 错误信息
 * @return: 
 */
module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = { 
      code: err.code || 9999,
      msg: err.message || 'unkown fail'
    }
  }

}