/*
 * @Descripttion: 
 * @Author: shendan
 * @Date: 2022-01-21 11:32:54
 * @LastEditors: shendan
 * @LastEditTime: 2022-01-21 13:42:50
 */
const qiniu = require('qiniu')

class QiniuManager {
  constructor(accessKey, secretKey, bucket) {
    // gengerate mac
    this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    this.bucket = bucket

    // init config class
    this.config = new qiniu.conf.Config()
    // 空间对应的机房
    this.config.zone = qiniu.zone.Zone_z0
    
    this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config)
  }
  uploadFile(key, localFilePath) {
    // gengerate uploadToken
    var options = {
      scope: this.bucket + ':' + key,
    }
    var putPolicy = new qiniu.rs.PutPolicy(options)
    var uploadToken = putPolicy.uploadToken(this.mac)

    var formUploader = new qiniu.form_up.FormUploader(this.config)
    var putExtra = new qiniu.form_up.PutExtra()
    // 文件上传
    return new Promise((resolve, reject) => {
      formUploader.putFile(uploadToken, key, localFilePath, putExtra, this._handleCallback(resolve, reject))
    })
  }
  deleteFile(key) {
    return new Promise((resolve, reject) => {
      this.bucketManager.delete(this.bucket, key, this._handleCallback(resolve, reject))
    })
  }
  _handleCallback(resolve, reject) { // 高阶函数
    return (respErr, respBody, respInfo) => {
      if (respErr) {
        throw respErr
      }
      if (respInfo.statusCode === 200) {
        resolve(respBody)
      } else {
        reject({
          statusCode: respInfo.statusCode,
          body: respBody
        })
      }
    }
  }
}

module.exports = QiniuManager