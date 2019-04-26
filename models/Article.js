/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 文章表
 * @Version: 1.0
 * @Date: 2018-12-05 16:49:11
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-25 13:51:10
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
    content_mkd: String, // 文章内容，markdown 格式
    liked_num: {  // 文章被喜欢的次数
      type: Number,
      default: 0,
    },
    comment: [  // 文章的评论
      {
        type: String,
        ref: 'CommentM',
      },
    ],
    comment_num: {  // 文章被评论的次数
      type: Number,
      default: 0,
    },
    view_num: {  // 文章浏览量
      type: Number,
      default: 0,
    },
    category: [  // 所属分类
      {
        type: String,
        ref: 'CategoryM',
      },
    ],
    column: {  // 所属专栏
      type: String,
      ref: 'ColumnM',
    },
    tag: [  // 所属标签
      {
        type: String,
        ref: 'Tag',
      },
    ],
    publish_time: Number, // 发布时间
    update_time: Number, // 更新时间
  },
  {
    // 防止表名自动变复数
    collection: 'Article',
  },
  {
    toJSON: {
      virtuals: true
    }
  }
)

// 格式化时期输出
ArticleSchema.path('publish_time').get(v => moment(v).format('YYYY-MM-DD HH:mm:ss'))
ArticleSchema.path('update_time').get(v => moment(v).format('YYYY-MM-DD'))

exports.ArticleM = mongoose.model('ArticleM', ArticleSchema)


ArticleSchema.virtual('author', {
  ref: 'AdminUserM',
  localField: 'author_id',
  foreignField: 'id'
})
