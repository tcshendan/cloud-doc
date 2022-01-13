/*
 * @Descripttion: 
 * @Author: shendan
 * @Date: 2022-01-13 11:11:45
 * @LastEditors: shendan
 * @LastEditTime: 2022-01-13 14:47:01
 */
const fs = window.require('fs').promises // 支持 promise 的 fs 对象
console.log('fs', fs)

const fileHelper = {
  readFile: (path) => {
    return fs.readFile(path, { encoding: 'utf8' })
  },
  writeFile: (path, content) => {
    return fs.writeFile(path, content, { encoding: 'utf8' })
  },
  renameFile: (path, newPath) => {
    return fs.rename(path, newPath)
  },
  deleteFile: (path) => {
    return fs.unlink(path)
  }
}

export default fileHelper