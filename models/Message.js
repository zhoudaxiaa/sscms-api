/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 用户消息表
 * @Version: 1.0
 * @Date: 2018-12-06 14:47:02
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-06-07 16:37:44
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
    publish_time: { // 发送时间
      type: Date,
      default: Date.now(),  // 更新时间
      // 格式化时期输出
      get: (v) => moment(v).format('YYYY-MM-DD HH:mm:ss')
    },

  },
  {
    strict: true,
    toJSON: {
      setters: true,
      getters: true,
      virtuals: false,
    },
    // 防止表名自动变复数
    collection: 'Message',
  },{
    toObject: {
      virtuals: true,
    },
  },

)

exports.MessageM = mongoose.model('Message', MessageSchema)
