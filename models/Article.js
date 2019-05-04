/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 文章表
 * @Version: 1.0
 * @Date: 2018-12-05 16:49:11
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-05-04 14:25:08
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const moment = require('moment')
const validate = require('mongoose-validator')

// 导入关联表
const AdminUserM = require('./AdminUser')
const CommentM = require('./Comment')
const CategoryM = require('./Category')
const ColumnM = require('./Column')
const TagM = require('./Tag')

// 标题效验器
const titleValidator = [
  validate({
    validator: 'isLength',
    arguments: [2,30],
    message: 'Title should be between {ARGS[0]} and {ARGS[1]} characters'
  })
]

const ArticleSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    author_id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      validate: titleValidator
    },
    from: {  // 文章来源， 0 为原创， 1 为转载
      type: Number,
      default: 0,
    },
    image: {  // 文章图片
      type: String,
      default: '/upload/images/defaultAtrImg.png',
    },
    is_top: {  // 是否推荐
      type: Boolean,
      default: false,
    },
    is_show: {  // 是否展示文章
      type: Boolean,
      default: true,
    },
    content_mkd: { // 文章内容，markdown 格式
      type: String,
      default: ''
    },
    content_word: { // 文章内容，传统word格式
      type: String,
      default: ''
    },
    liked_num: {  // 文章被喜欢的次数
      type: Number,
      default: 0,
    },
    comment_id: [  // 文章的评论
      {
        type: String,
      },
    ],
    view_num: {  // 文章浏览量
      type: Number,
      default: 0,
    },
    category_id: [  // 所属分类
      {
        type: String,
      },
    ],
    column_id: {  // 所属专栏
      type: String,
    },
    tag_id: [  // 所属标签
      {
        type: String,
      },
    ],
    publish_time: {
      type: Date,
      default: Date.now(), // 发布时间
      // 格式化时期输出
      get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
    },
    update_time: {
      type: Date,
      default: Date.now(),  // 更新时间
      // 格式化时期输出
      get: (v) => moment(v).format('YYYY-MM-DD HH:mm:ss')
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
    collection: 'Article',
  },{
    toObject: {
      virtuals: true,
    },
  }

)

exports.ArticleM = mongoose.model('ArticleM', ArticleSchema)

ArticleSchema.virtual('author', {
  ref: 'AdminUserM',
  localField: 'author_id',
  foreignField: 'id',
  justOne: true,
})

ArticleSchema.virtual('category', {
  ref: 'CategoryM',
  localField: 'category_id',
  foreignField: 'id',
})

ArticleSchema.virtual('column', {
  ref: 'ColumnM',
  localField: 'column_id',
  foreignField: 'id',
})

ArticleSchema.virtual('comment', {
  ref: 'CommentM',
  localField: 'comment_id',
  foreignField: 'id',
})

ArticleSchema.virtual('tag', {
  ref: 'TagM',
  localField: 'tag_id',
  foreignField: 'id',
})
