/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 数据库操作记录日志
 * @Version: 1.0
 * @Date: 2018-12-07 12:57:29
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-08 14:04:42
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const moment = require('moment')

const DataOptionLogSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    file_name: String, // 操作的文件名
    path: String, // 文件路径
    logs: String, // 操作
    date: Number, //操作时间
  },
  {
    // 防止表名变复数
    collection: 'DataOptionLog',
  },
)

DataOptionLogSchema.path('date').get(v => moment(v).format('YYYY-MM-DD HH:mm:ss'))

exports.DataOptionLogM = mongoose.model('DataOptionLog', DataOptionLogSchema)
