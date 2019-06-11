/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 角色权限认证中间件
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-25 16:01:36
 * @LastEditTime: 2019-06-11 21:29:02
 */
const { AdminRoleM } = require('../models/index')
const { AdminResourceM } = require('../models/index')

module.exports = async (ctx, next) => {
  let id = ctx.role_id  // jwt 验证通过后挂载的role_id
  let role
  let method
  let api
  let resource
  let hasPermission = false

  role = await AdminRoleM.findOne({
    id
  })
    .populate('resource')
    .exec()

  method = ctx.request.method.toLowerCase()  // http 方法转小写
  api = method + ctx.request.url.split('/').splice(0,3).join('/')  // 方法拼接请求的地址

  // 需要先在AdminRoleM 里设置toObject: {virtuals: true,}
  resource = role.toObject().resource || []

  if (resource.length === 0) {
    return Promise.reject({
      status: 200,
      code: 403,
      message: 'no permissions'
    })
  }
  
  // 遍历资源
  for (let i in resource) {
    let resourceApi = resource[i].api  // 取得资源的api

    if (resourceApi === api) {  // 如有该资源的权限return
      hasPermission = true
      break
    }
  }

  if (hasPermission) {
    await next()
  } else {
    // 没有抛出错误
    return Promise.reject({
      status: 403,
      code: '1001',
      message: 'no permissions'
    })
  }
}