/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 导航栏表
 * @Version: 1.0
 * @Date: 2018-12-06 16:34:58
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-08 14:04:56
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')

const NavigationSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    name: String, // 导航栏表
    is_show: {
      // 是否展示
      type: Boolean,
      default: true,
    },
    sort: {
      // 排序
      type: Number,
      default: 0,
    },
    introduce: String, // 介绍
    link: String, // 导航链接
    parent_id: {
      type: String, // 父导航id
      default: '0',
    },
  },
  {
    // 防止表名变复数
    collection: 'Navigation',
  },
)

exports.NavigationM = mongoose.model('Navigation', NavigationSchema)
