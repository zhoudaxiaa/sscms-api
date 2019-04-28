/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 路由规则
 * @Version: 1.0
 * @Date: 2018-11-21 17:10:09
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-28 14:03:01
 */

const Router = require('koa-router')
const {
  ArticleC,
  AdminUserC,
  AdminResourceC,
} = require('../controller/index')('v1')

const authToken = require('../middlewares/authToken')
const authPermission = require('../middlewares/authPermission')
const reqThrowError = require('../middlewares/reqThrowError')

const router = new Router()

// 处理错误并返回响应
router.use(reqThrowError)

/**
 * 管理员api
 */

// 登录
router.post('/admin/login', AdminUserC.login)

// 新增
router.post('/admin', authToken, authPermission, AdminUserC.add)

// 删除
router.delete('/admin/:id', authToken, authPermission, AdminUserC.delete)

// 修改
router.put('/admin/:id', authToken, authPermission, AdminUserC.put)

// 获取管理员
router.get('/admin/', AdminUserC.get)

/**
 * 管理员资源api
 */

// 新增
router.post('/resource', authToken, authPermission, AdminResourceC.add)


/**
 * 文章api
 */

// 新增
router.post('/article', authToken, authPermission, ArticleC.add)

// 获取所有文章信息
router.get('/article', ArticleC.get)

module.exports = router
