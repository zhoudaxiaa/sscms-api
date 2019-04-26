/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 角色权限认证
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-25 16:01:36
 * @LastEditTime: 2019-04-26 16:06:51
 */
const { AdminRoleM } = require('../models/index')
const { AdminResourceM } = require('../models/index')

module.exports = async (ctx, id) => {
  let role
  let method
  let api
  let resource

  try {
    role = await AdminRoleM.findOne({id}).populate({
      path: 'resource'
    }).exec()
  } catch (err) {
    return Promise.reject('no permissions')
  }

  method = ctx.request.method.toLowerCase()  // http 方法转小写
  api = method + ctx.request.url.split('/').splice(0,3).join('/')  // 方法拼接请求的地址

  // 取得角色资源，因为mongoose的未知原理，直接取值取不到，只能转下字符串在转回对象取值
  resource = JSON.parse(JSON.stringify(role)).resource

  // 遍历资源
  for (let i in resource) {
    let resourceApi = resource[i].api  // 取得资源的api
    console.log(resourceApi)
    console.log(api)
    if (resourceApi === api) return  // 如有该资源的权限return
  }

  // 没有抛出错误
  return Promise.reject('no permissions')
}