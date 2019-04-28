/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 管理员表
 * @Version: 1.0
 * @Date: 2018-12-06 12:00:07
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-28 22:16:53
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const moment = require('moment')

const md5 = require('md5.js')

const salt = 'm5NjIso1K'

// 导入关联表
const AdminRoleM = require('./AdminRole')
const AdminMessageM = require('./AdminMessage')

const AdminUserSchema = new Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    name: String,  // 管理员昵称
    avatar: String,  // 头像
    username: String,  // 管理员帐号
    password: {  // 密码
      type: String,
      set(v) {
        // 赋值时进行加密存储
        return new md5().update(v + salt).digest('hex')
      }
    },
    email: {  // 邮箱
      type: String,
      default: '',
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
      },
    ],
    ip_address: String,  // 登录ip
    login_time: {  // 登录时间
      type: Date,
      default: Date.now(),
      // 输出时进行格式化
      get: (v) => moment(v).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  {
    toJSON: {
      setter: true,
      getters: true
    },
    collection: 'AdminUser',  // 防止表名变复数
  },
)

exports.AdminUserM = mongoose.model('AdminUserM', AdminUserSchema)

// 虚拟值填充
AdminUserSchema.virtual('admin_message', {
  ref: 'AdminMessageM',
  localField: 'admin_message_id',
  foreignField: 'id'
})
