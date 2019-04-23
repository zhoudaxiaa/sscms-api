/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 文章控制器
 * @Version: 1.0
 * @Date: 2018-12-10 13:35:44
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-23 16:19:47
 */

// 导入关Model
const { ArticleM } = require('../../models/index')
const xss = require('xss')

class Article {

  // 新增文章
  async addArticle (ctx, next) {
    let data,
        result

    data = ctx.request.body

    // data.content_mkd = xss(data.content_mkd)
    // try {
    //   result = await ArticleM.create(data)
    // } catch (err) {
    //   ctx.body = err
    // }

    await ArticleM.create(data)

    if (result) {
      ctx.body = {
        msg: 'ok'
      }
    } else{
      ctx.body = {
        code: 2000,
        msg: 'create fail'
      }
    }

  }

  // 获取所有文章
  async getArticle (ctx, next) {
    let result

    result = await ArticleM.find().populate('authorv')
    ctx.body = result
  }
}

exports.ArticleC = new Article()
