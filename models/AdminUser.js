/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 管理员表
 * @Version: 1.0
 * @Date: 2018-12-06 12:00:07
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-23 14:28:25
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const moment = require('moment')

// 导入关联表
const Role = require('./AdminRole')
const AdminMessage = require('./AdminMessage')

const AdminUserSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    name: String, // 管理员昵称
    avatar: String, // 头像
    user_name: String, // 管理员帐号
    pass_word: String, // 密码
    email: String, // 邮箱
    role_id: {
      // 角色组ID
      type: String,
      ref: 'Role',
    },
    is_active: {
      // 是否启用
      type: Boolean,
      default: true,
    },
    introduce: String, // 介绍
    admin_message_id: [
      // 我的消息，关联 Message 表
      {
        type: String,
        ref: 'AdminMessage',
      },
    ],
    ip_address: String, // 登录ip
    login_time: Number, // 登录时间
  },
  {
    // 防止表名变复数
    collection: 'AdminUser',
  },
)

AdminUserSchema.path('login_time').get(v => moment(v).format('YYYY-MM-DD HH:mm:ss'))

exports.AdminUserM = mongoose.model('AdminUser', AdminUserSchema)
