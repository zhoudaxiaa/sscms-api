/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 评论控制器
 * @Version: 1.0
 * @Date: 2019-06-07 16:40:21
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-06-09 18:41:03
 */
const { CommentM } = require('../../models/index')

const CommentC = {

  // 获取全部
  async getAll (ctx, next) {
    let result

    result = await CommentM.find()
      .sort('sort')
      .exec()

    ctx.body = result
  },

  // 获取部分
  async get (ctx, next) {
    let result
    let total
    let query = ctx.query
    let start = query.start || 0
    let count = query.count || 10
    let type = query.type
    let value = query.value

    start = parseInt(start)
    count = parseInt(count)

    if (Number.isNaN(start) || Number.isNaN(count)) {
      return Promise.reject({
        status:400,
        code:1006,
        message:'start or count must be number'
      })      
    }

    // type 有值的时候 value 也必须有值
    if (type && !value) {
      return Promise.reject({
        status: 400,
        code: 2004,
        message: 'if type exist, value must be exist too'
      })
    }

    result = CommentM.find({
      [type]: value
    })
      .skip(start)
      .limit(count)
      .exec()

    total = CommentM.countDocuments({
      [type]: value
    })

    total = await total
    result = await  result

    ctx.body = {
      start,
      count,
      total,
      list: result
    }

  },

  // 获取单个
  async getOne (ctx, next) {
    let result
    let params = ctx.params
    let id = params.id

    result = await CommentM.findOne({
      id
    })
      .exec()

    if (result) {
      ctx.body = result
    } else {
      return Promise.reject({
        status: 200,
        code: 2001,
        message: 'not found'
      })
    }
  },

  // 获取最新部分评论
  async getNewest (ctx, next) {
    let result
    let total
    let query = ctx.query
    let start = query.start || 0
    let count = query.count || 10

    start = parseInt(start)
    count = parseInt(count)

    if (Number.isNaN(start) || Number.isNaN(count)) {
      return Promise.reject({
        status:400,
        code:1006,
        message:'start or count must be number'
      })      
    }

    result = CommentM.find()
      .sort('-publish_time')
      .skip(start)
      .limit(count)
      .populate([{
        path: 'author',
        select: 'id name avatar',
      },
      {
        path: 'article',
        select: 'id title image',
      },
      ])
      .exec()

    total = CommentM.countDocuments()

    total = await total
    result = await  result

    ctx.body = {
      start,
      count,
      total,
      list: result
    }

  },

}

exports.CommentC = CommentC