/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 系统资源表（权限操作）
 * @Version: 1.0
 * @Date: 2018-12-10 11:09:25
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-28 14:57:17
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')

const moment = require('moment')

const AdminResourceSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    name: String, // 资源名称
    type: String, // 0 普通菜单， 1 功能菜单
    api: String,  // 资源api路径，格式为，method + api，例：post/article
    route_path: String, // 路由路径
    component_path: String, // 模板路径
    icon: {
      type: String, // icon 图标样式
      default: 'component'
    },
    pid: {
      type: String, // 父级菜单id
      default: '',
    },
    is_active: {
      // 是否启用
      type: Boolean,
      default: true,
    },
    sort: {
      // 排序
      type: Number,
      default: 0,
    },
    introduce: String, // 介绍
    publish_time: Number, // 发布时间
  },
  {
    // 防止表名自动变复数
    collection: 'AdminResource',
  },
)

// 格式化时期输出
AdminResourceSchema.path('publish_time').get(v => moment(v).format('YYYY-MM-DD HH:mm:ss'))

exports.AdminResourceM = mongoose.model('AdminResourceM', AdminResourceSchema)
