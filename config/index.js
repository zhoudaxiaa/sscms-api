/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 项目配置文件
 * @Version: 1.0
 * @Date: 2018-11-14 09:40:21
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2018-12-26 14:33:54
 */

'use strict'

module.exports = {
  // 开发环境配置
  dev: {
    // 域名
    host: 'localhost',

    // 端口
    port: 3000,

    // 数据库
    dbUrl: 'mongodb://localhost/SSCMS',

    // 客服端地址
    clientUrl: 'http://127.0.0.1:8081',
  },

  // 生产环境配置
  build: {
    // 域名
    host: 'localhost',

    // 端口
    port: 3000,

    // 数据库
    dbUrl: 'mongodb://localhost/SSCMS',
  },
}
