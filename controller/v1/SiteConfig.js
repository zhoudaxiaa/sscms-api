/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 站点配置控制器
 * @Version: 1.0
 * @Date: 2019-06-08 12:52:23
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-06-08 14:32:42
 */
const { SiteConfigM } = require('../../models/index')

const SiteConfigC = {

  // 更新全部
  async put (ctx, next) {
    let result
    let resData = ctx.request.body

    try {
      result = await SiteConfigM.findOneAndUpdate({}, resData, {
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

    ctx.body = result

  },

  // 更新部分
  async patch (ctx, next) {
    let result
    let params = ctx.params
    let resData = ctx.request.body

    try {
      result = await SiteConfigM.findOneAndUpdate({}, resData, {
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

    ctx.body = result

  },  

  // 获取
  async get (ctx, next) {
    let result

    result = await SiteConfigM.findOne()
      .exec()

    ctx.body = result
  },


}

exports.SiteConfigC = SiteConfigC