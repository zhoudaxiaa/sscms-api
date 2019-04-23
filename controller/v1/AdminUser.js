/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 管理员控制器
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-23 16:14:02
 * @LastEditTime: 2019-04-23 17:12:59
 */
const { AdminUserM } = require('../../models/index')
const jwt = require('jsonwebtoken')
const md5 = require('md5.js')

const salt = 'm5NjIso1K'
const secret = 'JhhmsD2NS'

class AdminUser {

  async login (ctx, next) {
    let data,
        pass,
        token

    data = ctx.request.body

    pass = new md5().update(data.password+salt).digest('hex')

    token = jwt.sign({
      data: 'token'
    }, 'secret', {expiresIn: '1h'})
    console.log(token)

    ctx.body = token
  }
}

exports.AdminUserC = new AdminUser()