/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 用户表
 * @Version: 1.0
 * @Date: 2018-12-04 15:36:10
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-06-07 16:35:37
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const moment = require('moment')

// 导入关联表
const ColumnM = require('./Column')
const CommentM = require('./Comment')
const NotifyM = require('./Notify')
const ArticleM = require('./Article')
const MessageM = require('./Message')

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
    follow_col_id: [  // 关注的专栏， 关联 Column 表
      {
        type: String,
      },
    ],
    like_art_id: [  // 喜欢的文章， 关联 Article 表
      {
        type: String,
      },
    ],
    comment_id: [  // 我的评论， 关联 Comment 表
      {
        type: String,
      },
    ],
    message_id: [  // 我的消息， 关联 Message 表
      {
        type: String,
      },
    ],
    notify_id: [  // 系统通知， 关联 Notify 表
      {
        type: String,
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
    register_time: {  // 注册时间
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
    collection: 'User',
  },{
    toObject: {
      virtuals: true,
    },
  },

)

exports.UserM = mongoose.model('UserM', UserSchema)

UserSchema.virtual('follow_col', {
  ref: 'ColumnM',
  localField: 'follow_col_id',
  foreignField: 'id',
})

UserSchema.virtual('like_art', {
  ref: 'ArticleM',
  localField: 'like_art_id',
  foreignField: 'id',
})

UserSchema.virtual('comment', {
  ref: 'CommentM',
  localField: 'comment_id',
  foreignField: 'id',
})

UserSchema.virtual('message', {
  ref: 'MessageM',
  localField: 'message_id',
  foreignField: 'id',
})

UserSchema.virtual('notify', {
  ref: 'NotifyM',
  localField: 'notify_id',
  foreignField: 'id',
})