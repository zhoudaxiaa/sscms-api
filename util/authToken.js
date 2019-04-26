/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: token验证
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-23 15:35:41
 * @LastEditTime: 2019-04-26 13:02:00
 */
const jwt = require('jsonwebtoken')

const secret = 'JhhmsD2NS'

module.exports = async (ctx) => {
  let token
  try {
    
    let authorization = ctx.request.header.authorization

    if (authorization) {
      token = jwt.verify(authorization, secret)

      return (token.role_id)
    } else {
      return Promise.reject({message: 'protected resources'})
    }

  } catch (err) {
    return Promise.reject(err)
  }

}