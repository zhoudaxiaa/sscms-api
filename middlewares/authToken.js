/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: jwt 验证中间件
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-28 10:11:46
 * @LastEditTime: 2019-04-28 12:29:35
 */
const jwt = require('jsonwebtoken')

const secret = 'JhhmsD2NS'

module.exports = async (ctx, next) => {
  let token
  try {
    
    let authorization = ctx.request.header.authorization

    if (authorization) {
      token = jwt.verify(authorization, secret)
      ctx.role_id = token.role_id

      await next ()
    } else {
      return Promise.reject({ status: 401, code: 1001, message: 'protected resources' })
    }

  } catch (err) {
    return Promise.reject(err)
  }

}