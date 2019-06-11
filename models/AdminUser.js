/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 管理员表
 * @Version: 1.0
 * @Date: 2018-12-06 12:00:07
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-06-08 10:42:34
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

const AdminUserSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    name: {  // 管理员昵称
      type: String,
      required: true,
    },
    avatar: {  // 头像
      type: String,
      default: '',
    },
    username: {  // 管理员帐号
      type: String,
      required: true,
    },
    password: {  // 密码
      type: String,
      required: true,
      set(v) {
        // 赋值时进行加密存储
        return new md5().update(v + salt).digest('hex')
      },
    },
    email: {  // 邮箱
      type: String,
      default: '',
    },
    role_id: {  // 角色组ID
      type: String,
      required:true,
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
    ip_address: {  // 登录ip
      type: String,
      default: ''
    },
    login_time: {  // 登录时间
      type: Date,
      default: Date.now(),
      // 格式化时期输出
      get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
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
    collection: 'AdminUser',
  },{
    toObject: {
      getters: true,
      virtuals: true,
    },
  }
)

exports.AdminUserM = mongoose.model('AdminUserM', AdminUserSchema)

// 虚拟值填充
AdminUserSchema.virtual('role', {
  ref: 'AdminRoleM',
  localField: 'role_id',
  foreignField: 'id',
  justOne: true,
})

AdminUserSchema.virtual('admin_message', {
  ref: 'AdminMessageM',
  localField: 'admin_message_id',
  foreignField: 'id'
})
