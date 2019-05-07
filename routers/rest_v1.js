/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 路由规则
 * @Version: 1.0
 * @Date: 2018-11-21 17:10:09
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-05-07 23:25:04
 */

const Router = require('koa-router')

const {
  CommonC,
  ArticleC,
  AdminUserC,
  AdminResourceC,
  CategoryC,
  AdminRoleC,
  ColumnC,
  TagC,
} = require('../controller/index')('v1')

const authToken = require('../middlewares/authToken')
const authPermission = require('../middlewares/authPermission')
const checkAdmin = require('../middlewares/checkAdmin')
const reqThrowError = require('../middlewares/reqThrowError')

const router = new Router()

// 处理错误并返回响应
router.use(reqThrowError)

/**
 * 公共路由
 */
// 单个文件上传
router.post('/uploadfile', CommonC.uploadFile)

/**
 * 管理员路由
 */
// 登录
router.post('/admin/login', AdminUserC.login)

// 新增
router.post('/admin', authToken, authPermission, AdminUserC.add)

// 删除
router.delete('/admin/:id', authToken, authPermission, AdminUserC.delete)

// 信息全部更新
router.put('/admin/:id', authToken, authPermission, AdminUserC.put)

// 信息局部更新
router.patch('/admin/:id', AdminUserC.patch)

// 获取所有管理员
router.get('/admin/all', AdminUserC.getAll)

// 获取部分管理员
router.get('/admin', AdminUserC.get)

// 获取单个管理员
router.get('/admin/:id', AdminUserC.getOne)


/**
 * 文章路由
 */
// 新增
router.post('/article',  ArticleC.add)

// 删除
router.delete('/article/:id', ArticleC.delete)

// 更新全部
router.put('/article/:id', ArticleC.put)

// 更新局部
router.patch('/article/:id', ArticleC.patch)

// 获取全部
router.get('/article/all', checkAdmin, ArticleC.getAll)

// 获取部分
router.get('/article', ArticleC.get)

// 获取单个
router.get('/article/:id', ArticleC.getOne)

// 获取单个的评论
router.get('/article/:id/comment', ArticleC.getOneComment)

// 单个文章添加评论
router.post('/article/:id/comment', ArticleC.addComment)


/**
 * 分类路由
 */
// 添加
router.post('/category', authToken, authPermission, CategoryC.add)

// 删除
router.delete('/category/:id', authToken, authPermission, CategoryC.delete)

// 更新全部
router.put('/category/:id', CategoryC.put)

// 更新局部
router.patch('/category/:id', CategoryC.patch)

// 获取全部
router.get('/category/all', CategoryC.getAll)

// 获取部分
router.get('/category', CategoryC.get)

// 获取单个
router.get('/category/:id', CategoryC.getOne)


/** 
 * 角色路由
*/
// 添加
router.post('/role', AdminRoleC.add)

// 删除
router.delete('/role/:id',  AdminRoleC.delete)

// 更新
router.put('/role/:id',  AdminRoleC.put)

// 更新局部
router.patch('/role/:id',  AdminRoleC.patch)

// 获取全部
router.get('/role/all', AdminRoleC.getAll)

// 获取部分
router.get('/role', AdminRoleC.get)

// 获取单个
router.get('/role/:id', AdminRoleC.getOne)

// 获取单个角色的所有资源
router.get('/role/:id/resource/all', AdminRoleC.getOneAllResource)

// 获取角色的部分资源
router.get('/role/:id/resource', AdminRoleC.getOneResource)


/** 
 * 资源路由
*/
// 添加
router.post('/resource', AdminResourceC.add)

// 删除
router.delete('/resource/:id', AdminResourceC.delete)

// 更新全部
router.put('/resource/:id', AdminResourceC.put)

// 更新局部
router.patch('/resource/:id', AdminResourceC.patch)

// 获取全部
router.get('/resource/all', AdminResourceC.getAll)

// 获取部分
router.get('/resource', AdminResourceC.get)

// 获取单个
router.get('/resource/:id', AdminResourceC.getOne)

/** 
 * 专栏api
*/
// 添加
router.post('/column', authToken, authPermission, ColumnC.add)

// 删除
router.delete('/column/:id', authToken, authPermission, ColumnC.delete)

// 更新全部
router.put('/column/:id', ColumnC.put)

// 更新局部
router.patch('/column/:id', ColumnC.patch)

// 获取全部
router.get('/column/all', ColumnC.getAll)

// 获取部分
router.get('/column', ColumnC.get)

// 获取单个
router.get('/column/:id', ColumnC.getOne)

/** 
 *标签路由
*/
// 添加
router.post('/tag', authToken, authPermission, TagC.add)

// 删除
router.delete('/tag/:id', authToken, authPermission, TagC.delete)

// 更新全部
router.put('/tag/:id', TagC.put)

// 更新局部
router.patch('/tag/:id', TagC.patch)

// 获取全部
router.get('/tag/all', TagC.getAll)

// 获取部分
router.get('/tag', TagC.get)

// 获取单个
router.get('/tag/:id', TagC.getOne)

module.exports = router
