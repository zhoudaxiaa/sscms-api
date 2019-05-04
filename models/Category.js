/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 文章分类
 * @Version: 1.0
 * @Date: 2018-12-06 11:32:19
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-05-03 22:31:33
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
    name: { // 分类名
      type: String,
      required: true,
    },
    is_show: {  // 是否展示
      type: Boolean,
      default: true,
    },
    url: {  // seo url
      type: String,
      required: true,
    },
    pid: {
      type: String,
      default: '',
    },
    sort: {  // 排序
      type: Number,
      default: 0,
    },
    article_id: [
      {
        // 便签里的文章
        type: String,
      },
    ],
    introduce: { // 分类说明
      type: String,
      default: '',
    },
  },
  {
    // 防止表名变复数
    collection: 'Category',
  },
)

exports.CategoryM = mongoose.model('CategoryM', CategorySchema)