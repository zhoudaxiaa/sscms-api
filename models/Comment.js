/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 评论表
 * @Version: 1.0
 * @Date: 2018-12-06 10:34:07
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-06-07 21:51:32
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const moment = require('moment')

const UserM = require('./User')
const ArticleM = require('./Article')

const CommentSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    author_id: {  // 评论人
      type: String,
      required: true,
    },
    content: { // 评论内容
      type: String,
      required: true,
    },
    star_num: {
      // 点赞数
      type: Number,
      default: 0,
    },
    pid: {
      type: String, // 父评论id
      default: '0',
    },
    publish_time: {
      type: Date,
      default: Date.now(), // 发布时间
      // 格式化时期输出
      get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  {
    strict: true,
    toJSON: {
      setters: true,
      getters: true,
      virtuals: false,
    },
    // 防止表名自动变复数
    collection: 'Comment',
  },{
    toObject: {
      virtuals: true,
    },
  }
)

exports.CommentM = mongoose.model('CommentM', CommentSchema)

CommentSchema.virtual('author', {
  ref: 'UserM',
  localField: 'author_id',
  foreignField: 'id',
  justOne: true,
})

CommentSchema.virtual('article', {
  ref: 'ArticleM',
  localField: 'id',
  foreignField: 'comment_id',
  justOne: true,
})

