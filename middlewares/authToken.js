/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: jwt 验证中间件
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-28 10:11:46
 * @LastEditTime: 2019-05-04 21:33:11
 */
const jwt = require('jsonwebtoken')

const secret = 'JhhmsD2NS'

module.exports = async (ctx, next) => {
  let token
    
    let authorization = ctx.request.header.authorization

    if (authorization) {

      try {
        token = jwt.verify(authorization, secret)
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
          return Promise.reject({
            status: 200,
            code: 6005,
            message: 'jwt expired'
          })
        } else {
          return Promise.reject({
            status: 200,
            code: 6006,
            message: 'token error'
          })
        }

      }

      // 验证通过，再ctx 上存入role_id， 以便身份鉴权
      ctx.role_id = token.role_id

      await next ()
    } else {
      return Promise.reject({
        status: 403,
        code: 403,
        message: 'protected resources'
      })
    }



}