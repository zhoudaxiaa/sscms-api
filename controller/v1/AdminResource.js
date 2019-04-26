/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 资源控制器
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-26 14:15:13
 * @LastEditTime: 2019-04-26 15:44:40
 */

const { AdminResourceM } = require('../../models/index')

const authToken = require('../../util/authToken')
const authPermission = require('../../util/authPermissions')
const { reqThrowError } = require('../../util/throwError')

class AdminResource {

  // 资源增加
  async add (ctx, next) {
    let result
    let reqData = ctx.request.body
    let data = {}
    let role_id
    
    data.name = reqData.name
    data.type = reqData.type
    data.api = reqData.api
    data.route_path = reqData.route_path
    data.component_path = reqData.component_path
    data.icon = reqData.icon
    data.pid = reqData.pid
    data.is_active = reqData.is_active
    data.sort = reqData.sort
    data.introduce = reqData.introduce

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
      result = await AdminResourceM.create(data)
      ctx.body = result
    } catch (err) {
      reqThrowError(ctx, 400, 1006, err.message)
    }

  }

  // 管理员删除
  // async delete (ctx) {
  //   let result
  //   let resData = ctx.params
  //   let id = resData.id
  //   let role_id

  //   // token鉴权
  //   try {
  //     role_id = await authToken(ctx)
  //   } catch (err) {
  //     reqThrowError(ctx, 401, 9999, err.message)
  //     return
  //   }

  //   // 角色资源鉴权
  //   try {
  //     await authPermission(ctx, role_id)
  //   } catch (err) {
  //     reqThrowError(ctx, 401, 999, 'no permissions')
  //     return
  //   }

  //   try {
  //     result = AdminUserM.findOneAndRemove({id}).exec()
  //     ctx.body = result
  //   } catch (err) {
  //     reqThrowError(ctx, 400, 1006, err.message)
  //   }
    
  // }

}

exports.AdminResourceC = new AdminResource()