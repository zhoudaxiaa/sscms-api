/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 标签表
 * @Version: 1.0
 * @Date: 2018-12-06 11:02:58
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-08 14:05:09
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')

// 导入相关表
const Article = require('./Article')

const TagSchema = Schema(
  {
    id: {
      type: String,
      default: shortid,
    },
    name: String, // 标签名
    introduce: {
      // 标签介绍
      type: String,
      default: '写点什么吧',
    },
    article_id: [
      {
        // 便签里的文章
        type: String,
        ref: 'Article',
      },
    ]
  },
  {
    // 防止表名变复数
    collection: 'Tag',
  },
)

exports.TagM = mongoose.model('Tag', TagSchema)
