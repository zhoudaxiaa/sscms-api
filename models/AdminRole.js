/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 角色组表
 * @Version: 1.0
 * @Date: 2018-12-06 14:19:59
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-05-03 21:50:53
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
    name: { // 角色组名
      type: String,
      required: true,
    },
    resource_id: [
      // 资源组ID
      {
        type: String,
      },
    ],
    introduce: { // 介绍
      type: String,
      default: '',
    },
    publish_time: {  // 发布时期
      type: Date,
      default: Date.now(),
      // 格式化时期输出
      get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
    }
  },{
    strict: true,
    toJSON: {
      setters: true,
      getters: true,
      virtuals: false,
    },
    // 防止表名自动变复数
    collection: 'AdminRole',
  },{
    toObject: {
      virtuals: true,
    },
  }
  
)

exports.AdminRoleM = mongoose.model('AdminRoleM', AdminRoleSchema)

// 虚拟值填充
AdminRoleSchema.virtual('resource', {
  ref: 'AdminResourceM',
  localField: 'resource_id',
  foreignField: 'id',
  // getters: true,
})
