/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 系统通知表
 * @Version: 1.0
 * @Date: 2018-12-06 15:55:57
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-08 14:04:59
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const moment = require('moment')

const NotifySchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    title: String, // 标题
    content: String, // 内容
    is_read: {
      // 是否阅读
      type: Boolean,
      default: false,
    },
    publish_time: Number, // 发送时间
  },
  {
    // 防止表名变复数
    collection: 'Notify',
  },
)

NotifySchema.path('publish_time').get(v => moment(v).format('YYYY-MM-DD HH:mm:ss'))

exports.NotifyM = mongoose.model('Notify', NotifySchema)
