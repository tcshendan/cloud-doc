/*
 * @Descripttion: 
 * @Author: shendan
 * @Date: 2022-01-21 10:30:23
 * @LastEditors: shendan
 * @LastEditTime: 2022-01-21 13:44:36
 */
const QiniuManager = require('./src/QiniuManager')
var accessKey = '8Gn9IQ-eOdA-D-si7vnaXYuBl4e47gqPMzvj42vJ'
var secretKey = 'vpjzETyrlnmV3IaGZLrSJ_MLzo6Vtowmtnmpae_E'
var localFile = "C:/Users/sd/Desktop/test.md"
var key = 'test.md'

var publicBucketDomain = 'http://r61fnf19y.hd-bkt.clouddn.com'

const manager = new QiniuManager(accessKey, secretKey, 'zebao')
manager.uploadFile(key, localFile).then(data => {
  console.log('上传成功', data)
  return manager.deleteFile(key)
}).then(() => {
  console.log('删除成功')
})
// manager.deleteFile(key)

// // 文件下载
// var bucketManager = new qiniu.rs.BucketManager(mac, config)
// var publicBucketDomain = 'http://r61fnf19y.hd-bkt.clouddn.com'
// // 公开空间访问链接
// var publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key)
// console.log(publicDownloadUrl)