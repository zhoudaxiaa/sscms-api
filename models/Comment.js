/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 评论表
 * @Version: 1.0
 * @Date: 2018-12-06 10:34:07
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-25 13:04:44
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const moment = require('moment')

const CommentSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    type: {
      // 评论类型, 0 为评论， 1 为留言
      type: Number,
      default: 0,
    },
    content: String, // 评论内容
    star_num: {
      // 点赞数
      type: Number,
      default: 0,
    },
    parent_id: {
      type: String, // 父评论id
      default: '0',
    },
    publish_time: Number, // 评论日期
  },
  {
    // 防止表名自动变复数
    collection: 'Comment',
  },
)

CommentSchema.path('publish_time').get(v => moment(v).format('YYYY-MM-DD HH:mm:ss'))

exports.CommentM = mongoose.model('CommentM', CommentSchema)
