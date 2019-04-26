/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 管理员控制器
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-23 16:14:02
 * @LastEditTime: 2019-04-26 17:28:26
 */
const { AdminUserM } = require('../../models/index')
const jwt = require('jsonwebtoken')
const md5 = require('md5.js')

const authToken = require('../../util/authToken')
const authPermission = require('../../util/authPermissions')
const { reqThrowError } = require('../../util/throwError')

const salt = 'm5NjIso1K'
const secret = 'JhhmsD2NS'

class AdminUser {

  // 管理员登录
  async login (ctx, next) {
    let token
    let result
    let data = ctx.request.body
    let username = data.username
    let password = data.password

    password = new md5().update(password+salt).digest('hex')

    result = await AdminUserM.findOne({username, password})

    if (result) {
      token = jwt.sign({
        username,
        role_id: result.role_id
      }, secret, {expiresIn: '1h'})

      ctx.body = {
        id: result.id,
        name: result.name,
        avatar: result.avatar,
        role_id: result.role_id,
        token,
      }
    } else {
      reqThrowError(ctx, 400, 1000, 'username or password errer')
    }

  }

  // 添加
  async add (ctx, next) {
    let result
    let resData = ctx.request.body
    let data = {}
    let role_id

    data.name = resData.name
    data.avatar = resData.avatar
    data.username = resData.username
    data.password = resData.password
    data.email= resData.email
    data.role_id = resData.role_id
    data.is_active = resData.is_active
    data.instroduce = resData.instroduce

    // token鉴权
    try {
      role_id = await authToken(ctx)
    } catch (err) {
      reqThrowError(ctx, 401, 9999, err.message)
      return
    }

    // 角色资源鉴权
    try {
      await authPermission(ctx, role_id)
    } catch (err) {
      reqThrowError(ctx, 401, 999, 'no permissions')
      return
    }

    try {
      result = await AdminUserM.create(data)
      ctx.body = result
    } catch (err) {
      reqThrowError(ctx, 400, 1006, err.message)
    }
    
  }

  // 删除
  async delete (ctx) {
    let result
    let resData = ctx.params
    let id = resData.id
    let role_id

    // token鉴权
    try {
      role_id = await authToken(ctx)
    } catch (err) {
      reqThrowError(ctx, 401, 9999, err.message)
      return
    }

    // 角色资源鉴权
    try {
      await authPermission(ctx, role_id)
    } catch (err) {
      reqThrowError(ctx, 401, 999, 'no permissions')
      return
    }

    try {
      result = AdminUserM.findOneAndDelete({id}).exec()
      ctx.body = {
        msg: 'ok'
      }
    } catch (err) {
      reqThrowError(ctx, 400, 1006, err.message)
    }
    
  }

    // 修改
    async put (ctx) {
      let result
      let resData = ctx.params
      let id = resData.id
      let data = {}
      let role_id
  
      data.name = resData.name
      data.avatar = resData.avatar
      data.username = resData.username
      data.password = resData.password
      data.email= resData.email
      data.role_id = resData.role_id
      data.is_active = resData.is_active
      data.instroduce = resData.instroduce

      
      // token鉴权
      try {
        role_id = await authToken(ctx)
      } catch (err) {
        reqThrowError(ctx, 401, 9999, err.message)
        return
      }
      
      // 角色资源鉴权
      try {
        await authPermission(ctx, role_id)
      } catch (err) {
        reqThrowError(ctx, 401, 999, 'no permissions')
        return
      }
      
      password = new md5().update(password+salt).digest('hex')
  
      try {
        result = AdminUserM.findOneAndUpdate({id}).exec()
        ctx.body = result
      } catch (err) {
        reqThrowError(ctx, 400, 1006, err.message)
      }
      
    }

}

exports.AdminUserC = new AdminUser()