/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 角色组表
 * @Version: 1.0
 * @Date: 2018-12-06 14:19:59
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-28 22:12:54
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const moment  = require('moment')

// 导入关联表
const AdminResourceM = require('./AdminResource')

const AdminRoleSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    name: String, // 角色组名
    resource_id: [
      // 资源组ID
      {
        type: String,
      },
    ],
    introduce: String, // 介绍
    publish_time: Number, // 发布时间
  },
  {
    // 防止表名自动变复数
    collection: 'AdminRole',
  },
)

// 格式化时期输出
AdminRoleSchema.path('publish_time').get(v => moment(v).format('YYYY-MM-DD HH:mm:ss'))

exports.AdminRoleM= mongoose.model('AdminRoleM', AdminRoleSchema)

// 虚拟值填充
AdminRoleSchema.virtual('resource', {
  ref: 'AdminResourceM',
  localField: 'resource_id',
  foreignField: 'id'
})
