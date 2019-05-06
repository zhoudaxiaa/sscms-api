/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 角色控制器
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-30 12:39:56
 * @LastEditTime: 2019-05-06 14:36:27
 */
const { AdminRoleM } = require('../../models/index')

class AdminRole {

  // 增加
  async add (ctx, next) {
    let result
    let resData = ctx.request.body

    try {
      result = await AdminRoleM.create(resData)

    } catch (err) {
      return Promise.reject({
        status: 200,
        code: 2001,
        message: err.message
      })
    }

    ctx.body = result

  }

  // 删除（可以是单个id，也可以是多个id，多个id用过 逗号隔开）
  async delete (ctx) {
    let result
    let params = ctx.params
    let id = params.id
    let ids

    ids = id.split(',')

    result = await AdminRoleM.remove({
      id: ids
    }).exec()

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
    
  }

  // 更新全部
  async put (ctx, next) {
    let result
    let resData = ctx.request.body
    let params = ctx.params
    let id = params.id

    try {
      resData.resource_id = JSON.parse(resData.resource_id)
    } catch (err) {
      return Promise.reject({
        status: 200,
        code: 2005,
        message: 'resource_id must be array and can parse'
      })
    }

    try {
      result = await AdminRoleM.findOneAndUpdate({
        id
      }, resData, {
        new: true,
        runValidators: true,
      }).exec()

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
  }

  // 更新局部
  async patch (ctx, next) {
    let result
    let resData = ctx.request.body
    let params = ctx.params
    let id = params.id

    try {
      result = await AdminRoleM.findOneAndUpdate({
        id
      }, resData, {
        new: true,
        runValidators: true,
      }).exec()

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
  }

  // 获取所有
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

    result = await AdminRoleM.find({
      [type]: value
    })
      .sort(sortBy)
      .populate({ 
        path: 'resource',
        select: 'id name',
      })
      .exec()    

    ctx.body = result
  }

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

    result = AdminRoleM.find({
      [type]: value,
    })
      .skip(start)
      .limit(count)
      .sort(sortBy)
      .populate({ 
        path: 'resource',
        select: 'id name',
      }).exec()

    total = AdminRoleM.countDocuments({
      [type]: value
    })

    total = await total
    result = await  result

    if (result && total) {
      ctx.body = {
        start,
        count,
        total,
        list: result
      }

    } else {
      return Promise.reject({
        status: 200,
        code: 404,
        message: 'not found'
      })      
    }
    
  }

  // 获取单个
  async getOne (ctx) {
    let result
    let params = ctx.params
    let id = params.id

    result = await AdminRoleM.findOne({
      id
    })
      .populate({ 
        path: 'resource',
        select: 'id name',
      }).exec()

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

  // 获取单个角色的所有资源
  async getOneAllResource (ctx) {
    let result
    let params = ctx.params
    let id = params.id
    let query = ctx.query
    let type = query.type
    let value = query.value
    let sortBy = query.sortBy

    // type 有值的时候 value 也必须有值
    if (type && !value) {
      return Promise.reject({
        status: 400,
        code: 2004,
        message: 'if type exist, value must be exist too'
      })
    }

    result = await AdminRoleM.findOne({
      id
    })
      .populate({
        path: 'resource',
        match: { [type]: value },
        options: {
          sort: sortBy
        }
      })
      .exec()

    if (result) {
      ctx.body = result.toObject().resource || []
    } else {
      return Promise.reject({
        status: 200,
        code: 404,
        message: 'not found'
      })
    }
    
  }

  // 获取角色的部分资源
  async getOneResource (ctx) {
    let result
    let total
    let resource
    let params = ctx.params
    let id = params.id
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

    result = await AdminRoleM.findOne({
      id
    })
      .populate({
        path:'resource',
        match: { [type]: value },
        options: {
          skip: start,
          limit: count,
          sort: sortBy
        }
      }).exec()

    if (result) {
      resource = result.toObject().resource

      ctx.body = {
        start,
        count,
        total: resource.length,
        list: resource,
      }
    } else {
      return Promise.reject({
        status: 200,
        code: 404,
        message: 'not found'
      })
    }
    
  }

}

exports.AdminRoleC = new AdminRole()