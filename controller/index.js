/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 控制器统一导出接口
 * @Version: 1.0
 * @Date: 2018-12-10 13:11:13
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2018-12-11 15:45:49
 */

// 导入包
const glob = require('glob')
const { resolve } = require('path')

// 导入自己的方法
const { requireAll } = require('../util/requireAll')

/**
 * @msg: 根据版本导出相应版本Cotroller
 * @param {string} version 版本目录，例：v1
 * @return: 所有Controller 组成的对象
 */
function getController(version) {
  return requireAll(glob.sync(resolve(__dirname, './' + version + '/*.js')))
}

module.exports = getController
