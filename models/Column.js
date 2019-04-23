/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 专栏表
 * @Version: 1.0
 * @Date: 2018-12-06 10:00:19
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-08 14:04:29
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const moment = require('moment')

// 导入关联表
const AdminUser = require('./AdminUser')
const Article = require('./Article')

const ColumnSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    author_id: {
      // 创建者id
      type: String,
      ref: 'AdminUser',
    },
    sort: {
      // 排序
      type: Number,
      default: 0,
    },
    name: String, // 专栏名
    introduce: {
      // 专栏介绍
      type: String,
      default: '这人太懒了，连介绍都懒得写了！',
    },
    article_id: [
      // 专栏里的文章
      {
        type: String,
        ref: 'Article',
      },
    ],
    follow_num: {
      // 关注的人数
      type: Number,
      default: 0,
    },
    publish_time: Number, // 创建时间
  },
  {
    // 防止表名自动变复数
    collection: 'Column',
  },
)

// 格式化日期输出格式
ColumnSchema.path('publish_time').get(v => moment(v).format('YYYY-MM-DD HH:mm:ss'))

exports.ColumnM = mongoose.model('Column', ColumnSchema)
