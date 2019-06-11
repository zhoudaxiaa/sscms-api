/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 路由规则
 * @Version: 1.0
 * @Date: 2018-11-21 17:10:09
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-06-11 22:42:43
 */

const Router = require('koa-router')

const {
  CommonC,
  ArticleC,
  AdminUserC,
  UserC,
  CommentC,
  AdminResourceC,
  CategoryC,
  AdminRoleC,
  ColumnC,
  TagC,
  AdvertisingC,
  AdvertisingCategoryC,
  SiteConfigC,
  NavigationC,
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
router.patch('/admin/:id', authToken, authPermission,  AdminUserC.patch)

// 获取所有
router.get('/admin/all', AdminUserC.getAll)

// 获取部分
router.get('/admin', AdminUserC.get)

// 获取单个
router.get('/admin/:id', AdminUserC.getOne)


/**
 * 用户路由
 */
// 新增
router.post('/user', authToken, authPermission, UserC.add)

// 删除
router.delete('/user/:id', authToken, authPermission, UserC.delete)

// 信息全部更新
router.put('/user/:id', authToken, authPermission, UserC.put)

// 信息局部更新
router.patch('/user/:id', authToken, authPermission, UserC.patch)

// 获取所有
router.get('/user/all', UserC.getAll)

// 获取部分
router.get('/user', UserC.get)

// 获取部分最新
router.get('/user/newest', UserC.getNewest)

// 获取单个
router.get('/user/:id', UserC.getOne)


/**
 * 评论路由
 */

// 获取所有
router.get('/comment/all', CommentC.getAll)

// 获取部分
router.get('/comment', CommentC.get)

// 获取部分最新评论
router.get('/comment/newest', CommentC.getNewest)

// 获取单个
router.get('/comment/:id', CommentC.getOne)


/**
 * 文章路由
 */
// 新增
router.post('/article', authToken, authPermission, ArticleC.add)

// 删除
router.delete('/article/:id', authToken, authPermission, ArticleC.delete)

// 更新全部
router.put('/article/:id', authToken, authPermission, ArticleC.put)

// 更新局部
router.patch('/article/:id', authToken, authPermission, ArticleC.patch)

// 获取全部
router.get('/article/all', checkAdmin, ArticleC.getAll)

// 获取部分
router.get('/article', ArticleC.get)

// 获取单个的评论
router.get('/article/:id/comment', ArticleC.getOneComment)

// 单个文章添加评论
router.post('/article/:id/comment', ArticleC.addComment)

// 获取最新的部分文章
router.get('/article/newest', ArticleC.getNewest)

// 获取热门的部分文章
router.get('/article/hot', ArticleC.getHot)

// 获取推荐的部分文章
router.get('/article/top', ArticleC.getTop)

// 获取单个
router.get('/article/:id', ArticleC.getOne)

/**
 * 分类路由
 */
// 添加
router.post('/category', authToken, authPermission, CategoryC.add)

// 删除
router.delete('/category/:id', authToken, authToken, authPermission, CategoryC.delete)

// 更新全部
router.put('/category/:id', authToken, authPermission, CategoryC.put)

// 更新局部
router.patch('/category/:id', authToken, authPermission, CategoryC.patch)

// 获取全部
router.get('/category/all', CategoryC.getAll)

// 获取部分
router.get('/category', CategoryC.get)

// 获取单个
router.get('/category/:id', CategoryC.getOne)

// 获取单个分类的所有文章
router.get('/category/:id/article/all', CategoryC.getCategoryAllArticle)

// 获取单个分类的部分文章
router.get('/category/:id/article', CategoryC.getCategoryArticle)


/** 
 * 角色路由
*/
// 添加
router.post('/role', authToken, authPermission, AdminRoleC.add)

// 删除
router.delete('/role/:id', authToken, authPermission, AdminRoleC.delete)

// 更新
router.put('/role/:id', authToken, authPermission, AdminRoleC.put)

// 更新局部
router.patch('/role/:id', authToken, authPermission, AdminRoleC.patch)

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
router.post('/resource', authToken, authPermission, AdminResourceC.add)

// 删除
router.delete('/resource/:id', authToken, authPermission, AdminResourceC.delete)

// 更新全部
router.put('/resource/:id', authToken, authPermission, AdminResourceC.put)

// 更新局部
router.patch('/resource/:id', authToken, authPermission, AdminResourceC.patch)

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
router.put('/column/:id', authToken, authPermission, ColumnC.put)

// 更新局部
router.patch('/column/:id', authToken, authPermission, ColumnC.patch)

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
router.put('/tag/:id', authToken, authPermission, TagC.put)

// 更新局部
router.patch('/tag/:id', authToken, authPermission, TagC.patch)

// 获取全部
router.get('/tag/all', TagC.getAll)

// 获取部分
router.get('/tag', TagC.get)

// 获取单个
router.get('/tag/:id', TagC.getOne)


/** 
 *广告路由
*/
// 添加
router.post('/ads', authToken, authPermission, AdvertisingC.add)

// 删除
router.delete('/ads/:id', authToken, authPermission, AdvertisingC.delete)

// 更新全部
router.put('/ads/:id', authToken, authPermission, AdvertisingC.put)

// 更新局部
router.patch('/ads/:id', authToken, authPermission, AdvertisingC.patch)

// 获取全部
router.get('/ads/all', AdvertisingC.getAll)

// 获取部分
router.get('/ads', AdvertisingC.get)

// 获取单个
router.get('/ads/:id', AdvertisingC.getOne)


/** 
 *广告分类路由
*/
// 添加
router.post('/ads-category', authToken, authPermission, AdvertisingCategoryC.add)

// 删除
router.delete('/ads-category/:id', authToken, authPermission, AdvertisingCategoryC.delete)

// 更新全部
router.put('/ads-category/:id', authToken, authPermission, AdvertisingCategoryC.put)

// 更新局部
router.patch('/ads-category/:id', authToken, authPermission, AdvertisingCategoryC.patch)

// 获取全部
router.get('/ads-category/all', AdvertisingCategoryC.getAll)

// 获取部分
router.get('/ads-category', AdvertisingCategoryC.get)

// 获取单个
router.get('/ads-category/:id', AdvertisingCategoryC.getOne)

// 获取某个广告分类的所有广告图片
router.get('/ads-category/:id/ads/all', AdvertisingCategoryC.getCategoryAllAds)


/** 
 *站点配置路由
*/
// 更新全部
router.put('/site-config', authToken, authPermission, SiteConfigC.put)

// 更新局部
router.patch('/site-config', authToken, authPermission, SiteConfigC.patch)

// 获取
router.get('/site-config', SiteConfigC.get)


/** 
 *导航菜单路由
*/
// 添加
router.post('/nav', authToken, authPermission, NavigationC.add)

// 删除
router.delete('/nav/:id', authToken, authPermission, NavigationC.delete)

// 更新全部
router.put('/nav/:id', authToken, authPermission, NavigationC.put)

// 更新局部
router.patch('/nav/:id', authToken, authPermission, NavigationC.patch)

// 获取全部
router.get('/nav/all', NavigationC.getAll)

// 获取部分
router.get('/nav', NavigationC.get)

// 获取单个
router.get('/nav/:id', NavigationC.getOne)


module.exports = router
