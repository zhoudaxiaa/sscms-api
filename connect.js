/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 数据库链接
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-22 10:58:17
 * @LastEditTime: 2019-04-22 11:12:42
 */

//  导入包
const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')

// 导入自己的方法
const { requireAll } = require('./util/requireAll')

// 导入配置文件
let config = require('./config/index')

// 判断当前环境
config = process.env.NODE_NEV = 'production' ? config.build : config.dev

/**
 * @msg: 连接数据库
 * @param {type}
 * @return:
 */
;(() => {
  mongoose.connect(config.dbUrl)

  // 数据库第一次打开监听事件
  mongoose.connection.once('open', () => {
    console.log('数据库连接成功！！！')
  })

  let maxConnectNum = 0

  // 增加数据库连接断开监听事件
  mongoose.connection.on('disconnected', () => {
    console.log('******数据库断开******')

    if (maxConnectNum > 3) {
      throw new Error('数据库出现问题')
    }

    maxConnectNum++
    mongoose.connect(config.dbUrl)
  })

  // 增加数据库连接错误监听事件
  mongoose.connection.on('error', err => {
    console.log('******数据库连接错误******')

    if (maxConnectNum > 3) {
      throw new Error('数据库出现错误')
    }
  })
})()