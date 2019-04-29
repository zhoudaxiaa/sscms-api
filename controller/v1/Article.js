/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 文章控制器
 * @Version: 1.0
 * @Date: 2018-12-10 13:35:44
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-29 15:33:38
 */

// 导入关Model
const { ArticleM } = require('../../models/index')
const xss = require('xss')

class Article {

  // 新增文章
  async add (ctx, next) {
    let data
    let result
    let role_id

    data = ctx.request.body

    data.content_mkd = xss(data.content_mkd)

    try {
      result = await ArticleM.create(data)
      ctx.body = result
    } catch (err) {
      return Promise.reject({ status: 400, code: 1003, message: err.message})
    }

  }

  // 获取所有文章
  async get (ctx) {
    let result

    try {
      result = await ArticleM.find().populate([
        {
          path: 'author',
          select: '-password'
        },
        {
          path: 'category'
        }
      ]).exec()
      ctx.body = result
    } catch (err) {
      return Promise.reject({ status: 400, code: 1003, message: err.message})
    }

  }
}

exports.ArticleC = new Article()
