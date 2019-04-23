/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 路由规则
 * @Version: 1.0
 * @Date: 2018-11-21 17:10:09
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-23 17:10:29
 */

const Router = require('koa-router')
const { ArticleC, AdminUserC } = require('../controller/index')('v1')

const authToken = require('../util/authToken')

const router = new Router()

// 管理员登录api
router.post('/admin/login', authToken, AdminUserC.login)

// 文章api

// 新增文章
router.post('/article', authToken, ArticleC.addArticle)

// 获取所有文章信息
router.get('/article', ArticleC.getArticle)

module.exports = router
