/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 友情链接表
 * @Version: 1.0
 * @Date: 2018-12-06 16:48:17
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-08 14:04:47
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')

const FriendlyLinkSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    name: String, // 链接名
    link: String, // 链接地址
    introduce: String, // 介绍
    is_show: {
      // 是否显示
      type: Boolean,
      default: true,
    },
  },
  {
    collection: 'FriendlyLink',
  },
)

exports.FriendlyLinkM = mongoose.model('FriendlyLink', FriendlyLinkSchema)
