/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 文章控制器
 * @Version: 1.0
 * @Date: 2018-12-10 13:35:44
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-26 13:50:14
 */

// 导入关Model
const { ArticleM } = require('../../models/index')
const xss = require('xss')

const authToken = require('../../util/authToken')
const authPermission = require('../../util/authPermissions')
const { reqThrowError } = require('../../util/throwError')

class Article {

  // 新增文章
  async addArticle (ctx, next) {
    let data
    let result
    let role_id

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

    data = ctx.request.body

    data.content_mkd = xss(data.content_mkd)

    try {
      result = await ArticleM.create(data)
      ctx.body = result
    } catch (err) {
      reqThrowError(ctx, 400, 2000, err.message)
    }

  }

  // 获取所有文章
  async getArticle (ctx) {
    let result

    try {
      result = await ArticleM.findOne().populate([
        {
          path: 'author',
          select: 'name avatar id'
        }
      ]).exec()
      ctx.body = result
    } catch (err) {
      reqThrowError(ctx, 400, 10010, err.message)
    }

  }
}

exports.ArticleC = new Article()
