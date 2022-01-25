/*
 * @Descripttion: 
 * @Author: shendan
 * @Date: 2022-01-24 11:34:44
 * @LastEditors: shendan
 * @LastEditTime: 2022-01-25 13:15:52
 */
const fs = require('fs')
const zlib = require('zlib')

const src = fs.createReadStream('./test.js') // 可读流
const writeDesc = fs.createWriteStream('./test.gz') // 可写流

src.pipe(zlib.createGzip()).pipe(writeDesc)
