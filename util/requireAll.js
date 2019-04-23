/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 加载所有路由
 * @Version: 1.0
 * @Date: 2018-11-23 12:37:45
 * @LastEditors: zhoudaxiaa
 * @LastEditTime: 2018-12-11 15:06:31
 */

/**
 * @msg: require一个数组
 * @param {array} array 导入文件的地址数组
 * @return: 导入对象组成的对象
 */
const requireAll = function(array) {
  var result = {}

  array.forEach(v => {
    Object.assign(result, require(v))
  })

  return result
}

module.exports = { requireAll }
