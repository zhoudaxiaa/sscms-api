/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 管理员消息表
 * @Version: 1.0
 * @Date: 2018-12-06 15:39:35
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-08 14:02:58
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const moment = require('moment')

// 导入相关表
const Comment = require('./Comment')
const Column = require('./Column')
const User = require('./User')
const AdminUser = require('./AdminUser')

const AdminMessageSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    type: Number, // 消息类型，1：新用户注册， 2：文章被评论
    user_id: {
      // 用户id， 关联 User 表
      type: String,
      ref: 'User',
    },
    comment_id: {
      // 评论id， 关联 Comment 表
      type: String,
      ref: 'Comment',
    },
    admin_user_id: {
      // 管理员id， 关联 AdminUser 表
      type: String,
      ref: 'AdminUser',
    },
    column_id: {
      // 专栏id， 关联 Column 表
      type: String,
      ref: 'Column',
    },
    is_read: {
      // 是否阅读
      type: Boolean,
      default: false,
    },
    publish_time: Number, // 发送时间
  },
  {
    collection: 'AdminMessage',
  },
)

AdminMessageSchema.path('publish_time').get(v => moment(v).format('YYYY-MM-DD HH:mm:ss'))

exports.AdminMessageM = mongoose.model('AdminMessage', AdminMessageSchema)
