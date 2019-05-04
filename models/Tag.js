/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 标签表
 * @Version: 1.0
 * @Date: 2018-12-06 11:02:58
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-05-03 22:34:43
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')

const TagSchema = Schema(
  {
    id: {
      type: String,
      default: shortid,
    },
    name: { // 标签名
      type: String,
      required: true,
    },
    introduce: {
      // 标签介绍
      type: String,
      default: '写点什么吧',
    },

  },
  {
    // 防止表名变复数
    collection: 'Tag',
  },
)

exports.TagM = mongoose.model('TagM', TagSchema)