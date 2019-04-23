/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 路由入口
 * @Version: 1.0
 * @Date: 2018-11-21 09:04:47
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-22 11:03:18
 */

const Router = require('koa-router')

// 导入路由
const restV1 = require('./rest_v1')

const router = new Router()

router.use('/v1', restV1.routes(), restV1.allowedMethods())

module.exports = router
