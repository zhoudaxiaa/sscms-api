/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 用户控制器
 * @Version: 1.0
 * @Date: 2019-06-07 16:38:32
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-06-07 23:35:22
 */

const { UserM } = require('../../models/index')

const UserC = {

  // 添加
  async add (ctx, next) {
    let result
    let resData = ctx.request.body

    try {
      result = await UserM.create(resData)
    } catch (err) {
      return Promise.reject({
        status: 200,
        code: 2001,
        message: err.message
      })      
    }

    ctx.body = result
  },

  // 删除
  async delete (ctx) {
    let result
    let params = ctx.params
    let id = params.id
    let ids

    ids = id.split(',')

    result = await UserM.remove({
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
  async put (ctx, next) {
    let result
    let params = ctx.params
    let id = params.id
    let resData = ctx.request.body

    try {
      result = await UserM.findOneAndUpdate({
        id
      }, resData, {
        new: true,
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
        message:'not found'
      })
    }
  },

  // 更新局部
  async patch (ctx, next) {
    let result
    let params = ctx.params
    let id = params.id
    let resData = ctx.request.body

    try {
      result = await UserM.findOneAndUpdate({
        id
      }, resData, {
        new: true,
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
        code: 2001,
        message: 'not found'
      })
    }
  },

  // 获取全部
  async getAll (ctx, next) {
    let result

    result = await UserM.find()
      .select('-password')
      .sort('sort')
      .exec()

    ctx.body = result
  },

  // 获取部分
  async get (ctx, next) {
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
        status:400,
        code:1006,
        message:'start or count must be number'
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

    result = UserM.find({
      [type]: value
    })
      .skip(start)
      .limit(count)
      .select('-password')
      .sort(sortBy)
      .exec()

    total = UserM.countDocuments({
      [type]: value
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
  
  // 获取最新用户
  async getNewest (ctx, next) {
    let result
    let total
    let query = ctx.query
    let start = query.start || 0
    let count = query.count || 10

    start = parseInt(start)
    count = parseInt(count)

    if (Number.isNaN(start) || Number.isNaN(count)) {
      return Promise.reject({
        status:400,
        code:1006,
        message:'start or count must be number'
      })      
    }

    result = UserM.find()
      .sort('-publish_time')
      .skip(start)
      .limit(count)
      .select('-password')
      .exec()

    total = UserM.countDocuments()

    total = await total
    result = await  result

    ctx.body = {
      start,
      count,
      total,
      list: result
    }

  },

  // 获取单个
  async getOne (ctx, next) {
    let result
    let params = ctx.params
    let id = params.id

    result = await UserM.findOne({
      id
    })
      .exec()

    if (result) {
      ctx.body = result
    } else {
      return Promise.reject({
        status: 200,
        code: 2001,
        message: 'not found'
      })
    }
  },

}

exports.UserC = UserC