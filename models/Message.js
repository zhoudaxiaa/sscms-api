/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 用户消息表
 * @Version: 1.0
 * @Date: 2018-12-06 14:47:02
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-08 14:04:52
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const moment = require('moment')

// 导入关联表
const Comment = require('./Comment')
const Article = require('./Article')
const User = require('./User')

const MessageSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    type: Number, // 消息类型，1 为新评论消息， 2 为专栏新文章消息
    comment_id: {
      // 评论的id, 关联 Comment 表
      type: String,
      ref: 'Comment',
    },
    article_id: {
      // 新文章的id， 关联Article
      type: String,
      ref: 'Article',
    },
    user_id: {
      // 用户的id，关联 User 表
      type: String,
      ref: 'User',
    },
    is_read: {
      // 是否阅读
      type: Boolean,
      default: false,
    },
    publish_time: Number, // 发送时间
  },
  {
    // 防止表名变复数
    collection: 'Message',
  },
)

MessageSchema.path('publish_time').get(v => moment(v).format('YYYY-MM-DD HH:mm:ss'))

exports.MessageM = mongoose.model('Message', MessageSchema)
