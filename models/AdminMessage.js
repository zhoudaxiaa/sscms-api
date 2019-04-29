/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 管理员消息表
 * @Version: 1.0
 * @Date: 2018-12-06 15:39:35
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-29 12:44:39
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const moment = require('moment')

// 导入相关表
const CommentM = require('./Comment')
const ColumnM = require('./Column')
const UserM = require('./User')
const AdminUserM = require('./AdminUser')

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
      ref: 'CommentM',
    },
    admin_user_id: {
      // 管理员id， 关联 AdminUser 表
      type: String,
      ref: 'AdminUserM',
    },
    column_id: {
      // 专栏id， 关联 Column 表
      type: String,
      ref: 'ColumnM',
    },
    is_read: {
      // 是否阅读
      type: Boolean,
      default: false,
    },
    publish_time: {
      type: Date,
      default: Date.now(),
      get: v =>  moment(v).format('YYYY-MM-DD HH:mm:ss')
    }
  },{
    strict: true,
    toJSON: {
      setters: true,
      getters: true,
      virtuals: false,
    },
    toObject: {
      virtuals: true,
    },
    collection: 'AdminMessage',
  },
)

exports.AdminMessageM = mongoose.model('AdminMessageM', AdminMessageSchema)
