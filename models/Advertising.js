/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 单个广告
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-05-11 16:35:34
 * @LastEditTime: 2019-06-08 23:32:47
 */


// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')

const AdvertisingSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    introduce: { // 图片描述
      type: String,
      default: '',
    },
    category_id: {  // 广告分类id
      type: String,
      default: ''
    },
    is_show: {  // 是否展示
      type: Boolean,
      default: true,
    },
    link: {  // 链接
      type: String,
      default: '',
    },
    img_url: {  // 图片链接
      type: String,
      default: '',
    },
  },
  {
    // 防止表名变复数
    collection: 'Advertising',
  },
)

exports.AdvertisingM = mongoose.model('AdvertisingM', AdvertisingSchema)
