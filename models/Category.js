/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 文章分类
 * @Version: 1.0
 * @Date: 2018-12-06 11:32:19
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-08 14:04:25
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')

const CategorySchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    name: String, // 分类名
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
    introduce: String, // 分类说明
  },
  {
    // 防止表名变复数
    collection: 'Category',
  },
)

exports.CategoryM = mongoose.model('Category', CategorySchema)
