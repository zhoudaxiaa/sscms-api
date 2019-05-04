/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 资源控制器
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-26 14:15:13
 * @LastEditTime: 2019-05-04 23:00:49
 */

const { AdminResourceM } = require('../../models/index')

class AdminResource {

  // 添加
  async add (ctx, next) {
    let result
    let resData = ctx.request.body

    try {
      result = await AdminResourceM.create(resData)
    } catch (err) {
      return Promise.reject({
        status: 200,
        code: 2001,
        message: err.message
      })      
    }

    ctx.body = result
  }

  // 删除
  async delete (ctx) {
    let result
    let params = ctx.params
    let id = params.id
    
    result = await AdminResourceM.findOneAndDelete({
      id
    })
      .exec()

    if (result) {
      ctx.body = {
        id: result.id
      }
    } else {
      return Promise.reject({
        status: 200,
        code: 404,
        message: 'not found'
      })
    }
    
  }

  // 更新全部
  async put (ctx, next) {
    let result
    let params = ctx.params
    let id = params.id
    let resData = ctx.request.body

    try {
      result = await AdminResourceM.findOneAndUpdate({
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
  }

  // 更新局部
  async patch (ctx, next) {
    let result
    let params = ctx.params
    let id = params.id
    let resData = ctx.request.body

    try {
      result = await AdminResourceM.findOneAndUpdate({
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
  }

  // 获取全部
  async getAll (ctx, next) {
    let result
    let query = ctx.query
    let type = query.type
    let value = query.value
    let sortBy = query.sortBy || 'sort'
    
    // type 有值的时候 value 也必须有值
    if (type && !value) {
      return Promise.reject({
        status: 400,
        code: 2004,
        message: 'if type exist, value must be exist too'
      })
    }

    result = await AdminResourceM.find({
      [type]: value
    })
      .sort(sortBy)
      .exec()

    ctx.body = result
  }

  // 获取局部
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

    result = AdminResourceM.find({
      [type]: value
    })
      .skip(start)
      .limit(count)
      .sort(sortBy)
      .exec()

    total = AdminResourceM.countDocuments({
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

  }

  // 获取单个
  async getOne (ctx, next) {
    let result
    let params = ctx.params
    let id = params.id

    result = await AdminResourceM.findOne({
      id
    })
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
  }

}

exports.AdminResourceC = new AdminResource()