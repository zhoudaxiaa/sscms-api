/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 角色控制器
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-30 12:39:56
 * @LastEditTime: 2019-04-30 16:43:34
 */
const { AdminRoleM } = require('../../models/index')

class AdminRole {

  // 增加
  async add (ctx, next) {
    let result
    let reqData = ctx.request.body
    let data = {}

    data.name = reqData.name
    data.introduce = reqData.introduce

    try {
      result = await AdminResourceM.create(data)
      ctx.body = result
    } catch (err) {
      return Promise.reject({ status: 400, code: 1003, message: err.message })
    }

  }

  // 给角色添加资源
  async addResource (ctx, next) {
    let result
    let params = ctx.params
    let id = params.id
    let reqData = ctx.request.body
    let data = {}

    if (!reqData.resource_id instanceof String) {
      ctx.body = {
        code: 1005,
        msg: 'resource_id must be string'
      }
      return
    }

    data.resource_id = JSON.parse(reqData.resource_id)

    try {
      result = await AdminRoleM.findOneAndUpdate({id}, data, { new: true, }).exec()
      ctx.body = result
    } catch (err) {
      return Promise.reject({ status: 400, code: 1003, message: err.message })
    }

  }

  // 删除
  async delete (ctx) {
    let result
    let params = ctx.params
    let id = params.id

    try {
      result = await AdminRoleM.findOneAndDelete({id}).exec()
      ctx.body = {
        msg: 'ok'
      }
    } catch (err) {
      return Promise.reject({ status:400, code:1006, massage:err.message })
    }
    
  }

  // 获取
  async get (ctx, next) {
    let result

    try {
      result = await AdminRoleM.find().populate('resource').exec()
      ctx.body = result
    } catch (err) {
      console.log(err)
      return Promise.reject({ status:400, code:1006, massage:err.message})      
    }
  }

}

exports.AdminRoleC = new AdminRole()