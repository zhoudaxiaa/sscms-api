/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 用户表
 * @Version: 1.0
 * @Date: 2018-12-04 15:36:10
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-08 14:05:13
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const moment = require('moment')

// 导入关联表
const Column = require('./Column')
const Comment = require('./Comment')
const Notify = require('./Notify')
const Article = require('./Article')
const Message = require('./Message')

const UserSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    name: String, // 用户昵称
    user_name: String, // 用户名
    pass_word: String, // 密码
    logo: {
      // 头像
      type: String,
      default: '/upload/images/defaultlogo.png',
    },
    position: String, // 职位
    introduce: {
      // 个人简介
      type: String,
      default: '',
    },
    website: String, // 个人主页
    wechat: String, // 微信号
    github: String, // github 帐号
    email: String, // 邮箱
    phone_num: Number, // 手机号
    follow_col_id: [
      // 关注的专栏， 关联 Column 表
      {
        type: String,
        ref: 'Column',
      },
    ],
    like_art_id: [
      // 喜欢的文章， 关联 Article 表
      {
        type: String,
        ref: 'Article',
      },
    ],
    comment_id: [
      // 我的评论， 关联 Comment 表
      {
        type: String,
        ref: 'Comment',
      },
    ],
    message_id: [
      // 我的消息， 关联 Message 表
      {
        type: String,
        ref: 'Message',
      },
    ],
    notify_id: [
      // 系统通知， 关联 Notify 表
      {
        type: String,
        ref: 'Notify',
      },
    ],
    is_column_msg: {
      // 邮箱专栏新文章提醒
      type: Boolean,
      default: true,
    },
    is_comment_msg: {
      // 邮箱新回复提醒
      type: Boolean,
      default: true,
    },
    register_time: Number, // 注册时间
  },
  {
    // 防止表名自动变复数
    collection: 'User',
  },
)

// 格式化日期输出
UserSchema.path('register_time').get(v => moment(v).format('YYYY-MM-DD HH:mm:ss'))

exports.UserM = mongoose.model('User', UserSchema)
