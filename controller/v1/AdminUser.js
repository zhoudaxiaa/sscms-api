/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 管理员控制器
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-23 16:14:02
 * @LastEditTime: 2019-04-28 15:43:59
 */
const { AdminUserM } = require('../../models/index')
const jwt = require('jsonwebtoken')
const md5 = require('md5.js')

const salt = 'm5NjIso1K'
const secret = 'JhhmsD2NS'

class AdminUser {

  // 管理员登录
  async login (ctx, next) {
    let token
    let result
    let resData = ctx.request.body
    let data = {}
    data.username = resData.username
    data.password = resData.password

    data.password = new md5().update(data.password+salt).digest('hex')

    try {
      result = await AdminUserM.findOne(data).exec()

      token = jwt.sign({
        username: data.username,
        role_id: result.role_id
      }, secret, {expiresIn: '1h'})

      ctx.body = {
        id: result.id,
        name: result.name,
        avatar: result.avatar,
        role_id: result.role_id,
        token,
      }
    } catch (err) {
      console.log(err)
      return Promise.reject({ status:400, code:1001, message:'username or password errer'})
    }

  }

  // 添加
  async add (ctx, next) {
    let result
    let resData = ctx.request.body
    let data = {}

    data.name = resData.name
    data.avatar = resData.avatar
    data.username = resData.username
    data.password = resData.password
    data.email= resData.email
    data.role_id = resData.role_id
    data.is_active = resData.is_active
    data.introduce = resData.introduce
    data.login_time = resData.login_time
    data.ip_address = resData.ip_address

    data.password = new md5().update(data.password+salt).digest('hex')

    try {
      result = await AdminUserM.create(data)
      ctx.body = {
        id: result.id,
        name: result.name,
        avatar: result.avatar,
        uername: result.username,
        email: result.email,
        role_id: result.role_id,
        is_active: result.is_active,
        introduce: result.introduce,
        login_time: result.login_time,
        ip_address: result.ip.address,
      }
    } catch (err) {
      return Promise.reject({ status:400, code:1006, massage:err.message})
    }
    
  }

  // 删除
  async delete (ctx) {
    let result
    let params = ctx.params
    let id = params.id

    try {
      result = await AdminUserM.findOneAndDelete({id}).exec()
      ctx.body = {
        msg: 'ok'
      }
    } catch (err) {
      return Promise.reject({ status:400, code:1006, massage:err.message})
    }
    
  }

  // 修改
  async put (ctx) {
    let result
    let resData = ctx.request.body
    let params = ctx.params
    let id = params.id
    let data = {}

    data.name = resData.name
    data.avatar = resData.avatar
    data.username = resData.username
    data.password = resData.password
    data.email= resData.email
    data.role_id = resData.role_id
    data.is_active = resData.is_active
    data.instroduce = resData.instroduce
    data.login_time = resData.login_time
    data.ip_address = resData.ip_address
    
    data.password = new md5().update(data.password+salt).digest('hex')

    try {
      result = await AdminUserM.findOneAndUpdate({id}, data).select('id name avatar username email role_id is_active introduce login_time ip_address').exec()
      
      ctx.body = result
    } catch (err) {
      return Promise.reject({ status:400, code:1006, massage:err.message})      
    }
    
  }

  // 查询
  async get (ctx) {
    let result
    let query = ctx.query
    let start = query.start
    let count = query.count

    try {
      result = await AdminUserM.find().exec()
      ctx.body = result
    } catch (err) {
      return Promise.reject({ status:400, code:1006, massage:err.message})      
    }
    
  }

}

exports.AdminUserC = new AdminUser()