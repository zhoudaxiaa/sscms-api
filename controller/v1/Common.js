/*
 * @Author: zhoudaxiaa
 * @Github: https://
 * @Website: https://
 * @Description: 公共控制器
 * @Version: 1.0
 * @LastEditors: zhoudaxiaa
 * @Date: 2019-05-05 15:10:31
 * @LastEditTime: 2019-05-06 13:58:24
 */
const shortid = require('shortid')
const fs = require('fs')
const path = require('path')

/**
 * @description: 生成文件夹名称
 * @return: String 文件名
 */
function getUploadDirName(){
  const date = new Date();
  let month = Number.parseInt(date.getMonth()) + 1;
  month = month.toString().length > 1 ? month : `0${month}`;
  const dir = `${date.getFullYear()}${month}${date.getDate()}`;
  return dir;
}

/**
 * @description: 判断文件夹是否存在 如果不存在则创建文件夹
 * @param {String} 文件夹名
 * @return: 
 */
function checkDirExist(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p);
  }
}

/**
 * @description: 获取文件的后缀
 * @param {String} 文件名 
 * @return: String 文件后缀名
 */
function getUploadFileExt(name) {
  let ext = name.split('.');
  return ext[ext.length - 1];
}

/**
 * @description: 创建文件名
 * @param {String} 文件后缀名 
 * @return: 
 */
function getUploadFileName(ext) {
  let time = new Date().getTime()

  return `${time}.${ext}`
}

const Common = {
  async uploadFile (ctx, next) {
console.log(ctx.request.files)
// console.log(ctx.request.files.file[0].path)
    try {
      const file = ctx.request.files.file  // 获取上传文件

      // 创建可读流
      const reader = fs.createReadStream(file.path)

      const ext = getUploadFileExt(file.name)  // 获取后缀

      const dirName = getUploadDirName()

      // 保存的地址
      let filePath = path.join(__dirname, `../../public/upload/${dirName}/`)

      // 检查文件夹是否存在，不存在则创建
      checkDirExist(filePath)

      const fileName = getUploadFileName(ext)

      filePath = `${filePath}${fileName}`  // 创建最终文件地址

      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      
  
      const pro = new Promise( (resolve, reject) => {
        var stream = reader.pipe(upStream);  // 可读流通过管道写入可写流
  
        stream.on('finish', function () {
          resolve(`//127.0.0.1:3000/upload/${dirName}/${fileName}`);
        });
      })
      
      ctx.body = await pro

    } catch (err) {
      // console.log(err)
      return Promise.reject({
        status: 200,
        code: 3001,
        message: 'upload file fail'
      }) 
    }

  }
}

exports.CommonC = Common
