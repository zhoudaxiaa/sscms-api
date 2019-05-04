/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 项目入口
 * @Version: 1.0
 * @Date: 2018-11-14 09:38:09
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-05-01 23:12:34
 */

const Koa = require('koa')
const koaBody = require('koa-body')
const onerror = require('koa-onerror')
const cors = require('koa2-cors')
const json = require('koa-json')

// 数据库连接
require('./connect')

const logUtil = require('./util/log4js')
const router = require('./routers')
let config = require('./config')
const app = new Koa()

config = process.env.NODE_NEV = 'production' ? config.build : config.dev

// 使用 koa-onerror 捕捉错误
onerror(app, {
  accepts() {
    return 'json'
  },
  json(err, ctx) {
    ctx.body = {
      code: 9999,
      msg: err.message
    }
  }
})

// 日志处理中间件
app.use(async (ctx, next) => {
  // 响应开始时间
  const start = new Date()
  // 响应间隔时间
  let ms

  try {
    // 进入下一个中间件
    await next()

    ms = new Date() - start

    // 记录响应日志
    logUtil.resLogger(ctx, ms)
  } catch (err) {
    ms = new Date() - start

    // 记录错误日志
    logUtil.errLogger(ctx, err, ms)
  }
})

// 使用 cors 解决跨域请求
app.use(
  cors({
    // origin: function (ctx) {
    //   if (ctx.url === '/v1') {
    //       return "*"; // 允许来自所有域名请求
    //   }
    //   return 'http://localhost:8080';
    // },
    origin: '*',
    // origin: config.clientUrl,
    // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    // allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }),
)

// get 数据处理中间件
// app.use(json())

// post 数据处理中间件
app.use(koaBody({
  multipart: true
}))

// 使用路由
app.use(router.routes())

module.exports = app
