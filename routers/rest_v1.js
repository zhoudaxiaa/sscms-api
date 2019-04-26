/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 路由规则
 * @Version: 1.0
 * @Date: 2018-11-21 17:10:09
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-26 17:32:55
 */

const Router = require('koa-router')
const {
  ArticleC,
  AdminUserC,
  AdminResourceC,
} = require('../controller/index')('v1')

const authToken = require('../util/authToken')

const router = new Router()

/**
 * 管理员api
 */

// 登录
router.post('/admin/login', AdminUserC.login)

// 新增
router.post('/admin', AdminUserC.add)

// 删除
router.delete('/admin/:id', AdminUserC.delete)

// 修改
router.put('/resource', AdminUserC.put)

/**
 * 管理员资源api
 */

// 新增
router.post('/resource', AdminResourceC.add)


/**
 * 文章api
 */

// 新增
router.post('/article', ArticleC.addArticle)

// 获取所有文章信息
router.get('/article', ArticleC.getArticle)

module.exports = router
