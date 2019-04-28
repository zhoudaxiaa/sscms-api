/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 路由规则
 * @Version: 1.0
 * @Date: 2018-11-21 17:10:09
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-28 22:17:36
 */

const Router = require('koa-router')
const {
  ArticleC,
  AdminUserC,
  AdminResourceC,
  CategoryC,
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

// 获取单个管理员
router.get('/admin/:id', AdminUserC.getOne)

// 获取部分管理员
router.get('/admin', authToken, authPermission, AdminUserC.get)

// 获取所有管理员
router.get('/admin/all', authToken, authPermission, AdminUserC.getAll)

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

// 获取文章
router.get('/article', ArticleC.get)

/**
 * 分类api
 */
router.get('/category', CategoryC.get)

module.exports = router
