/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 系统日志
 * @Version: 1.0
 * @Date: 2018-12-07 13:24:48
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-08 14:05:05
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const moment = require('moment')

const SystemLogSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    type: Number, // 日志类型，0 为登录， 1 为异常
    logs: String, // 日志内容
    date: Number, // 操作日期
  },
  {
    // 防止表名变复数
    collection: 'SystemLog',
  },
)

SystemLogSchema.path('date').get(v => moment(v).format('YYYY-MM-DD HH:mm:ss'))

exports.SystemLogM = mongoose.model('SystemLog', SystemLogSchema)
