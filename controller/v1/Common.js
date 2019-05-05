/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 公共控制器
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-05-05 15:10:31
 * @LastEditTime: 2019-05-05 17:06:22
 */
const shortid = require('shortid')
const fs = require('fs')
const path = require('path')

class Common {
  async uploadFile (ctx, next) {
    // console.log(ctx.request.files)
    // return ctx.body = ctx.request.body
    const file = ctx.request.files.file  // 获取上传文件

    // 创建可读流
    const reader = fs.createReadStream(file.path)
    let filePath = path.join(__dirname, '../../public/upload/') + `/${file.name}`
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    ctx.body = `//127.0.0.1:3000/upload/${file.name}`

  }
}

exports.CommonC = new Common()
