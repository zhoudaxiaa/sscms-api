/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: new project
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-04-28 20:34:42
 * @LastEditTime: 2019-06-09 19:53:13
 */
const { CategoryM, ArticleM } = require('../../models/index')

const CategoryC = {

  // 添加
  async add (ctx, next) {
    let result
    let resData = ctx.request.body

    try {
      result = await CategoryM.create(resData)
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

    result = await CategoryM.remove({
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
      result = await CategoryM.findOneAndUpdate({
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
        message:'not found'
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
      result = await CategoryM.findOneAndUpdate({
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

  // 获取全部
  async getAll (ctx, next) {
    let result
    let query = ctx.query
    let sortBy = query.sortBy || 'sort'

    result = await CategoryM.find()
      .populate([{
          path: 'article',
        }
      ])
      .sort(sortBy)
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

    result = CategoryM.find({
      [type]: value
    })
      .populate([{
          path: 'article',
        }
      ])
      .skip(start)
      .limit(count)
      .sort(sortBy)
      .exec()

    total = CategoryM.countDocuments({
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

    result = await CategoryM.findOne({
      id
    })
      .populate([{
          path: 'article',
        }
      ])
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

  // 获取单个分类的所有文章
  async getCategoryAllArticle (ctx, next) {
    let result
    let params = ctx.params
    let id = params.id
    let query = ctx.query
    let sortBy = query.sortBy || 'sort'

    result = await ArticleM.find({
      category_id: id,
    })
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
      .sort(sortBy)
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

  // 获取单个分类的部分文章
  async getCategoryArticle (ctx, next) {
    let result
    let params = ctx.params
    let id = params.id
    let query = ctx.query
    let start = query.start || 0
    let count = query.count || 10
    let type = query.type
    let value = query.value
    let sortBy = query.sortBy || 'sort'

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

    result = await ArticleM.find({
      category_id: id,
    })
      .skip(start)
      .limit(count)
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

    total = ArticleM.countDocuments({
      category_id: id,
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


}

exports.CategoryC = CategoryC