/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 数据库连接
 * @Version: 1.0
 * @Date: 2018-11-14 09:43:03
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2019-04-22 11:15:56
 */

/**
 * @msg: 导出所有的Model
 * @return: 所有Schema 组成的对象
 */
const glob = require('glob')
const { resolve } = require('path')

const { requireAll } = require('../util/requireAll')

const models = requireAll(glob.sync(resolve(__dirname, './*.js')))


module.exports = models
