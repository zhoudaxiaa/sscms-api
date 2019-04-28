/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: new project
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-28 20:34:42
 * @LastEditTime: 2019-04-28 20:47:13
 */
const { CategoryM } = require('../../models/index')

class Category {
  async get (ctx, next) {
    let result

    try {
      result = await CategoryM.find().exec()
      ctx.body = result
    } catch (err) {
      console.log(err)
      return Promise.reject({ status:400, code:1006, massage:err.message})      
    }
  }
}

exports.CategoryC = new Category()