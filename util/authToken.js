/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: token验证
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-23 15:35:41
 * @LastEditTime: 2019-04-23 17:14:41
 */
const jwt = require('jsonwebtoken')

const secret = 'JhhmsD2NS'

module.exports = (ctx, next) => {
  console.log(ctx.request.header.authorization)
  let isLogin = jwt.verify(ctx.request.header.authorization, 'toke')
  console.log(isLogin)
  next()
}