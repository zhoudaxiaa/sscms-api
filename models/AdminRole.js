/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 角色组表
 * @Version: 1.0
 * @Date: 2018-12-06 14:19:59
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-08 14:06:11
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')

// 导入关联表
const AdminResource = require('./AdminResource')

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
        ref: 'AdminResource',
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

exports.AdminRoleM= mongoose.model('AdminRole', AdminRoleSchema)
