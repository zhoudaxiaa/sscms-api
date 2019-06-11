/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 网站配置表
 * @Version: 1.0
 * @Date: 2018-12-07 13:30:59
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-06-08 14:36:51
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')

const SiteConfigSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    title: {  // 网站标题
      type: String,
      default: 'SSCMS 系统',
    },
    logo: {  // logo
      type: String,
      default: '',
    },
    site_url: {  // 网站域名
      type: String,
      default: ''
    },
    seo_title: {  // seo标题
      type: String,
      default: ''
    },
    seo_keyword: {  // 关键词
      type: String,
      default: ''
    },
    seo_discription: {  // seo描述 
      type: String,
      default: '',
    },
    site_copyright: {  // 版权信息 
      type: String,
      default: '',
    },
    site_icp: {  // 备案号
      type: String,
      default: ''
    },
    site_code: {  // 统计代码等第三方代码
      type: String,
      default: ''
    },
  },
  {
    // 防止表名变复数
    collection: 'SiteConfig',
  },
)

exports.SiteConfigM = mongoose.model('SiteConfigM', SiteConfigSchema)
