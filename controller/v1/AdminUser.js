/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 管理员控制器
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-23 16:14:02
 * @LastEditTime: 2019-06-08 10:47:00
 */
const { AdminUserM } = require('../../models/index')
const jwt = require('jsonwebtoken')
const md5 = require('md5.js')
const moment = require('moment')

const salt = 'm5NjIso1K'  // 密码加盐
const secret = 'JhhmsD2NS'  // jwt secret

const getUserIp = (ctx) => {
  return ctx.req.headers['x-forwarded-for'] ||
    ctx.req.connection.remoteAddress ||
    ctx.req.socket.remoteAddress ||
    ctx.req.connection.socket.remoteAddress;
}

const AdminUserC = {

  // 管理员登录
  async login (ctx, next) {
    let token
    let result
    let resData = ctx.request.body
    let data = {}
    data.username = resData.username && resData.username.trim()
    data.password = resData.password && resData.password.trim()

    if (!data.username || !data.password) {
      return Promise.reject({
        status: 200,
        code: 2000,
        message: 'username or password is empty'
      })
    }

    result = await AdminUserM.findOneAndUpdate(data, {
      login_time: new Date(),
      ip_address: getUserIp(ctx)
    })
      .select('id name avatar role_id ip_address login_time')
      .exec()

    if (result) {
      token = jwt.sign({
        username: data.username,
        role_id: result.role_id
      }, secret, { expiresIn: '1d' })

      // 转成对象后，model的login_time的get函数不起效，所以手动格式化时间
      result = result.toObject()

      result.login_time = moment(result.login_time).format('YYYY-MM-DD HH:mm:ss')

      result.token = token
      
      ctx.body = result
    } else {
      return Promise.reject({
        status: 200,
        code: 2002,
        message: 'username or password error'
      })
    }

  },

  // 添加
  async add (ctx, next) {
    let result
    let resData = ctx.request.body

    try {
      result = await AdminUserM.create(resData)  // create 返回的是一个promise，无法使用query对象的select筛选

    } catch (err) {
      return Promise.reject({
        status: 200,
        code: 2001,
        message:err.message
      })
    }

    result = result.toObject()
    delete result.password  // 去掉结果中的password 后输出
    
    ctx.body = result
    
  },

  // 删除
  async delete (ctx) {
    let result
    let params = ctx.params
    let id = params.id
    let ids

    ids = id.split(',')

    result = await AdminUserM.remove({
      id: ids
    })
      .exec()

    if (result.n > 0) {
      ctx.body = {
        id: ids
      }

    } else {
      return Promise.reject({
        status: 200,
        code: 404,
        message: 'not found'
      })
    }
    
  },

  // 更新全部
  async put (ctx) {
    let result
    let resData = ctx.request.body
    let params = ctx.params
    let id = params.id

    try {
      result = await AdminUserM.findOneAndUpdate({
        id
      }, resData, {
        new: true,
        runValidators: true,
        select: '-password'
      })
        .exec()

    } catch (err) {
      return Promise.reject({
        status: 200,
        code: 2001,
        message: err.message
      })      
    }

    if (result) {
      ctx.body = result
    } else {
      return Promise.reject({
        status: 200,
        code: 404,
        message: 'not found'
      })
    }
    
  },

  // 更新局部
  async patch (ctx) {
    let result
    let resData = ctx.request.body
    let params = ctx.params
    let id = params.id
    let data = {}

    // 密码为空时不更新
    resData.password && (resData.password = resData.password.trim())
    !resData.password && delete resData.password

    try {
      result = await AdminUserM.findOneAndUpdate({
        id
      }, resData, {
        new: true,
        select: '-password',
        runValidators: true,
      })
        .exec()
      
    } catch (err) {
      return Promise.reject({
        status: 200,
        code: 2001,
        message: err.message
      })      
    }

    if (result) {
      ctx.body = result
    } else {
      return Promise.reject({
        status: 200,
        code: 404,
        message: 'not found'
      })
    }
    
  },

  // 获得所有
  async getAll (ctx) {
    let result
    let query = ctx.query
    let sortBy = query.sortBy || 'sort'

    result = await AdminUserM.find()
      .sort('sort')
      .populate([
        {
          path: 'role'
        },  
        {
          path: 'admin_message'
        },
      ])
      .sort(sortBy)
      .select('-password')
      .exec()

    ctx.body = result
    
  },

  // 获取部分
  async get (ctx) {
    let result
    let total
    let query = ctx.query
    let start = query.start || 0
    let count = query.count || 10
    let type = query.type
    let value = query.value
    let sortBy = query.sortBy || 'sort'

    start = parseInt(start)
    count = parseInt(count)

    if (Number.isNaN(start) || Number.isNaN(count)) {
      return Promise.reject({
        status: 400,
        code: 2003,
        message: 'start or count must be number'
      })      
    }

    // type 有值的时候 value 也必须有值
    if (type && !value) {
      return Promise.reject({
        status: 400,
        code: 2004,
        message: 'if type exist, value must be exist too'
      })
    }

    result = AdminUserM.find({
      [type]: value,
    })
      .skip(start)
      .limit(count)
      .sort('sort')
      .populate([
        {
          path: 'role'
        },  
        {
          path: 'admin_message'
        },
      ])
      .select('-password')
      .exec()

    total = AdminUserM.countDocuments({
      [type]: value,
    })

    total = await total
    result = await  result
    
    ctx.body = {
      start,
      count,
      total,
      list: result
    }

  },

  // 获取单个用户
  async getOne (ctx) {
    let result
    let params = ctx.params
    let id = params.id

    result = await AdminUserM.findOne({
      id
    })
      .populate([
        {
          path: 'role'
        },  
        {
          path: 'admin_message'
        },
      ])
      .select('-password')
      .exec()

    if (result) {
      ctx.body = result
    } else {
      return Promise.reject({
        status: 200,
        code: 404,
        message: 'not found'
      })
    }
    
  },

}

exports.AdminUserC = AdminUserC