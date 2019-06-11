/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 广告
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-05-11 16:35:19
 * @LastEditTime: 2019-06-09 12:59:39
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')

const { AdvertisingM } = require('./Advertising')

const AdvertisingCategorySchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    name: { // 广告分类名
      type: String,
    },
    is_show: {  // 是否展示
      type: Boolean,
      default: true,
    },
    is_carousel: {  // 是否轮播
      type: Boolean,
      default: true,
    },
    height: {  // 图片高度
      type: String,
    },
  },
  {
    // 防止表名变复数
    collection: 'AdvertisingCategory',
  },
)

exports.AdvertisingCategoryM = mongoose.model('AdvertisingCategoryM', AdvertisingCategorySchema)

// 虚拟值填充
AdvertisingCategorySchema.virtual('ads', {
  ref: 'AdvertisingM',
  localField: 'id',
  foreignField: 'category_id',
})