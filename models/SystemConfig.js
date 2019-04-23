/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 网站配置表
 * @Version: 1.0
 * @Date: 2018-12-07 13:30:59
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-08 14:05:02
 */

// 导入包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')

const SystemConfigSchema = Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    title: {
      // 网站标题
      type: String,
      default: 'SSCMS 系统',
    },
    Domain: {
      // 网站域名
      type: String,
      default: 'https://www.zhoudaxiaa.com',
    },
    discription: {
      // 网站描述
      type: String,
      default: '全栈开发',
    },
    keyword: String, // 关键词
    email_server: String, // 邮箱服务器地址
    email: String, // 邮箱账号
    email_pwd: String, // 邮箱密码
    mongodb_server: String, // mongodb 数据库地址
    data_back_path: String, // 数据备份路径
    auto_data_back: {
      // 是否自动数据备份，默认 否
      type: Boolean,
      default: false,
    },
    data_back_rate: {
      // 自动备份频率，默认 7 天
      type: Number,
      default: 7,
    },
    code: String, // 统计代码等第三方代码
  },
  {
    // 防止表名变复数
    collection: 'SystemConfig',
  },
)

exports.SystemConfigM = mongoose.model('SystemConfig', SystemConfigSchema)
