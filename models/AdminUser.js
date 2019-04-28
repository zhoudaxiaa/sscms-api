/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 管理员表
 * @Version: 1.0
 * @Date: 2018-12-06 12:00:07
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-28 17:06:45
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const moment = require('moment')

// 导入关联表
const AdminRoleM = require('./AdminRole')
const AdminMessageM = require('./AdminMessage')

const AdminUserSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    name: String,  // 管理员昵称
    avatar: String,  // 头像
    username: String,  // 管理员帐号
    password: String,  // 密码
    email: {  // 邮箱
      type: String,
      default: ''
    },
    role_id: {  // 角色组ID
      type: String,
    },
    is_active: {  // 是否启用
      type: Boolean,
      default: true,
    },
    introduce: {  // 介绍
      type: String,
      default: '',
    },
    admin_message_id: [  // 我的消息，关联 Message 表
      {
        type: String,
        ref: 'AdminMessageM',
      },
    ],
    ip_address: String,  // 登录ip
    login_time: {  // 登录时间
      type: Date,
      default: Date.now()
    },
  },
  {
    collection: 'AdminUser',  // 防止表名变复数
  },
)

AdminUserSchema.path('login_time').get((v) => {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})

exports.AdminUserM = mongoose.model('AdminUserM', AdminUserSchema)
