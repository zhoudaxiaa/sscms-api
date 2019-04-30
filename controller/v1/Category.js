/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: new project
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-28 20:34:42
 * @LastEditTime: 2019-04-30 17:02:49
 */
const { CategoryM } = require('../../models/index')

class Category {

  async add (ctx, next) {
    let result
    let resData = ctx.request.body
    let data = {}

    data.name = resData.name
    data.is_show = resData.is_show
    data.sort = resData.sort
    data.url = resData.url
    data.pid= resData.pid
    data.introduce = resData.introduce

    try {
      result = await CategoryM.create(data)
      ctx.body = result
    } catch (err) {
      console.log(err)
      return Promise.reject({ status:400, code:1006, massage:err.message})      
    }
  }

  // 删除
  async delete (ctx) {
    let result
    let params = ctx.params
    let id = params.id

    CategoryM.findOneAndDelete({id}, (err,data) => {
      console.log(err,data)
    })

    try {
      result = await CategoryM.findOneAndDelete({id}).exec()
      ctx.body = {
        msg: 'ok'
      }
    } catch (err) {
      return Promise.reject({ status:400, code:1006, massage:err.message})
    }
    
  }

  // 获取
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