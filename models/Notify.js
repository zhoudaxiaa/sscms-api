/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 系统通知表
 * @Version: 1.0
 * @Date: 2018-12-06 15:55:57
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-06-07 16:36:34
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
    publish_time: { // 发送时间
      type: Date,
      default: Date.now(),  // 更新时间
      // 格式化时期输出
      get: (v) => moment(v).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    strict: true,
    toJSON: {
      setters: true,
      getters: true,
      virtuals: false,
    },
    // 防止表名自动变复数
    collection: 'Notify',
  },{
    toObject: {
      virtuals: true,
    },
  },
  
)

exports.NotifyM = mongoose.model('Notify', NotifySchema)
