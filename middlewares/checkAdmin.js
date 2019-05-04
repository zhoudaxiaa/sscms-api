/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 检测是不是管理员
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-05-03 20:48:14
 * @LastEditTime: 2019-05-03 21:10:38
 */
const jwt = require('jsonwebtoken')

const { AdminUserM } = require('../models/index')

const secret = 'JhhmsD2NS'

module.exports = async (ctx, next) => {
  let token
  let adminName
  let result

  let authorization = ctx.request.header.authorization

  if (!authorization) {
    return next()
  }

  try {
    token = jwt.verify(authorization, secret)
        
    adminName = token && token.username

    result = await AdminUserM.findOne({ username: adminName })

    if (result) {
      ctx.isAdmin = true
    }

    await next ()
  } catch (err) {
    return Promise.reject(err)
  }

}