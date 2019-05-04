/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 系统资源表（权限操作）
 * @Version: 1.0
 * @Date: 2018-12-10 11:09:25
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-05-03 21:50:08
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
    name: { // 资源名称
      type: String,
      required: true,
    },
    type: { // 0 普通菜单， 1 功能菜单
      type: Number,
      default: 0,
    },
    api: {  // 资源api路径，格式为，method + api，例：post/article
      type: String,
      default: '',
    },
    route_path: { // 路由路径
      type: String,
      default: '',
    },
    component_path: { // 模板路径
      type: String,
      default: '',
    },
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
    introduce: { // 介绍
      type: String,
      default: '',
    },
    publish_time: {
      type: Date,
      default: Date.now(),
      // 格式化时期输出
      get: (v) => moment(v).format('YYYY-MM-DD HH:mm:ss'),
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
    collection: 'AdminResource',
  },{
    toObject: {
      virtuals: true,
    },
  }
)

exports.AdminResourceM = mongoose.model('AdminResourceM', AdminResourceSchema)
