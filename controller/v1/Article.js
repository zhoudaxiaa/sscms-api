/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 文章控制器
 * @Version: 1.0
 * @Date: 2018-12-10 13:35:44
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-05-07 23:20:17
 */

// 导入关Model
const { ArticleM, CommentM } = require('../../models/index')
const xss = require('xss')

const ArticleC = {

  // 新增文章
  async add (ctx, next) {
    let result
    let role_id
    let mkd
    let word
    let category_id
    let tag_id
    let resData = ctx.request.body

    mkd = resData.content_mkd
    word = resData.content_word
    category_id = resData.category_id
    tag_id = resData.tag_id

    mkd && (resData.content_mkd = xss(mkd))
    word && (resData.content_word = xss(word))
    
    if (category_id) {
      try {
        resData.category_id = JSON.parse(category_id)
      } catch (err) {
        return Promise.reject({
          status: 400,
          code: 2005,
          message: 'category_id must be array string and can parse'
        })
      }
    }

    if (tag_id) {
      try {
        resData.tag_id = JSON.parse(tag_id)
      } catch (err) {
        return Promise.reject({
          status: 400,
          code: 2005,
          message: 'tag_id must be array string and can parse'
        })
      }
    }

    try {
      result = await ArticleM.create(resData)
    } catch (err) {
      return Promise.reject({
        status: 200,
        code: 2001,
        message: err.message
      })
    }
    
    ctx.body = result
  },

  // 删除
  async delete (ctx) {
    let result
    let params = ctx.params
    let id = params.id
    let ids

    ids = id.split(',')

    result = await ArticleM.remove({
      id: ids
    })
      .exec()

    if (result.n > 0) {
      ctx.body = {
        id: ids
      }

    } else {
      return Promise.reject({
        status: 200,
        code: 404,
        message: 'not found'
      })
    }
    
  },

  // 更新全部
  async put (ctx, next) {
    let result
    let params = ctx.params
    let id = params.id
    let resData = ctx.request.body

    try {
      result = await ArticleM.findOneAndUpdate({
        id
      }, resData, {
        new: true,
        runValidators: true,
      })
        .exec()
      
    } catch (err) {
      return Promise.reject({
        status: 200,
        code: 2001,
        message: err.message
      })      
    }

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

  // 更新局部
  async patch (ctx, next) {
    let result
    let params = ctx.params
    let id = params.id
    let resData = ctx.request.body

    try {
      result = await ArticleM.findOneAndUpdate({
        id
      }, resData, {
        new: true,
        runValidators: true,
      })
        .exec()

    } catch (err) {
      return Promise.reject({
        status: 200,
        code: 2001,
        message: err.message
      })      
    }

    if (result) {
      ctx.body = result
    } else {
      return Promise.reject({
        status: 200,
        code: 404,
        message: 'not found'
      })
    }
  },

  // 获取所有文章
  async getAll (ctx) {
    let result
    let queryObj = {}

    // 默认只输出显示的文章
    queryObj.is_show = true

    // 是管理员的话就显示所有文章（去除查询条件）
    ctx.isAdmin && delete queryObj.is_show

    result = await ArticleM.find(queryObj)
      .populate([{
          path: 'author',
          select: 'id name avatar',
        },{
          path: 'category',
          select: 'id name url',
        },{
          path: 'column',
          select: 'id content',
        },{
          path: 'comment',
          select: 'id name'
        },{
          path: 'tag',
          select: 'id name'
        }
      ])
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
    let sortBy = query.sortBy || 'sort'
    let queryObj = {}

    // 默认只输出显示的文章
    queryObj.is_show = true

    // 是管理员的话就显示所有文章（去除查询条件）
    ctx.isAdmin && delete queryObj.is_show

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

    // 根据字段和字段值查询
    queryObj[type] = value

    result = ArticleM.find(queryObj)
      .skip(start)
      .limit(count)
      .sort(sortBy)
      .populate([{
          path: 'author',
          select: 'id name avatar',
        },{
          path: 'category',
          select: 'id name url',
        },{
          path: 'column',
          select: 'id name',
        },{
          path: 'comment',
          select: 'id content'
        },{
          path: 'tag',
          select: 'id name'
        }
      ])
      .exec()

    total = ArticleM.countDocuments(queryObj)

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

    result = await ArticleM.findOne({
      id
    })
      .populate([{
          path: 'author',
          select: '-password -admin_message_id -ip_address -role_id',
        },{
          path: 'category',
          select: 'id name url'
        },{
          path: 'column',
          select: 'id name',
        },{
          path: 'comment',
          select: 'id content'
        },{
          path: 'tag',
        }
      ])
      .exec()

    if (result) {
      ctx.body = result
    } else {
      return Promise.reject({
        status: 200,
        code: 404,
        message: 'not found'
      })
    }
  },

  // 获取单个的评论
  async getOneComment (ctx, next) {
    let result
    let params = ctx.params
    let id = params.id

    result = await ArticleM.findOne({
      id
    })
      .populate([{
          path: 'comment',
          populate: {
            path: 'author',
            select: 'id name avatar'
          }
        }
      ])
      .exec()

    if (result) {
      ctx.body = result.toObject().comment || []
    } else {
      return Promise.reject({
        status: 200,
        code: 404,
        message: 'not found'
      })
    }
  },

  // 单个文章添加评论
  async addComment (ctx, next) {
    let commentResult
    let articleResult
    let params = ctx.params
    let id = params.id
    let resData = ctx.request.body

    try {
      commentResult = await CommentM.create(resData)  // 先创建评论
      
      articleResult = await ArticleM.findOneAndUpdate({  // 再根据文章id给文章的comment_id 添加评论的id
        id
      }, {
        $push:  {
          comment_id: commentResult.id
        }
      })

    } catch (err) {
      return Promise.reject({
        status: 200,
        code: 2001,
        message: err.message
      }) 
    }
    
    if (articleResult) {
      ctx.body = commentResult
    } else {
      return Promise.reject({
        status: 200,
        code: 404,
        message: 'not found'
      })
    }

  },

}

exports.ArticleC = ArticleC
