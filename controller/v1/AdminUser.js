/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 管理员控制器
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-23 16:14:02
 * @LastEditTime: 2019-04-29 16:06:04
 */
const { AdminUserM } = require('../../models/index')
const jwt = require('jsonwebtoken')
const md5 = require('md5.js')

const salt = 'm5NjIso1K'  // 密码加盐
const secret = 'JhhmsD2NS'  // jwt secret

const getUserIp = (ctx) => {
  return ctx.req.headers['x-forwarded-for'] ||
    ctx.req.connection.remoteAddress ||
    ctx.req.socket.remoteAddress ||
    ctx.req.connection.socket.remoteAddress;
}

class AdminUser {

  // 管理员登录
  async login (ctx, next) {
    let token
    let result
    let resData = ctx.request.body
    let data = {}
    data.username = resData.username
    data.password = resData.password

    try {
      result = await AdminUserM.findOneAndUpdate(data, {
        login_time: new Date(),
        ip_address: getUserIp(ctx)
      }).exec()

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

    try {
      result = await AdminUserM.create(data)
      ctx.body = {
        id: result.id,
        name: result.name,
        avatar: result.avatar,
        username: result.username,
        email: result.email,
        role_id: result.role_id,
        is_active: result.is_active,
        introduce: result.introduce,
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
    data.email= resData.email
    data.role_id = resData.role_id
    data.is_active = resData.is_active
    data.introduce = resData.introduce

    // 密码有值时再插入
    if (resData.password) {
      data.password = resData.password
    }
    

    try {
      result = await AdminUserM.findOneAndUpdate({id}, data, {
        new: true,
        select: '-password'
      }).exec()
      
      ctx.body = result
    } catch (err) {
      return Promise.reject({ status:400, code:1006, massage:err.message})      
    }
    
  }

  // 获取单个用户
  async getOne (ctx) {
    let result
    let params = ctx.params
    let id = params.id

    try {
      result = await AdminUserM.findOne({id}).populate([
        {
          path: 'role'
        },  
        {
          path: 'admin_message'
        },
      ]).exec()

      ctx.body = result
    } catch (err) {

      return Promise.reject({ status:400, code:1006, massage:err.message})      
    }
    
  }

  // 获取部分
  async get (ctx) {
    let result
    let query = ctx.query
    let start = query.start || 0
    let count = query.count || 10
    let total

    try {
      result = AdminUserM.find().skip(start).limit(count).populate('admin_message').select('-password').exec()
      total = AdminUserM.count()

      total = await total
      result = await  result

      ctx.body = { start, count, total, list: result }
    } catch (err) {
      return Promise.reject({ status:400, code:1006, massage:err.message})      
    }
    
  }

    // 获得所有
    async getAll (ctx) {
      let result

      try {
        result = await AdminUserM.find().populate('admin_message').select('-password').exec()
  
        ctx.body = result
      } catch (err) {
        console.log(err)
        return Promise.reject({ status:400, code:1006, massage:err.message})      
      }
      
    }

}

exports.AdminUserC = new AdminUser()