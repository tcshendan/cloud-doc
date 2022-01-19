/*
 * @Descripttion: 
 * @Author: shendan
 * @Date: 2022-01-18 16:49:12
 * @LastEditors: shendan
 * @LastEditTime: 2022-01-18 17:05:05
 */
const { BrowserWindow } = require('electron')

class AppWindow extends BrowserWindow {
  constructor(config, urlLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        // 开启node
        nodeIntegration: true,
        contextIsolation: false,
        // 开启remote
        enableRemoteModule: true
      },
      show: false,
      backgroundColor: '#efefef'
    }
    const finalConfig = { ...basicConfig, ...config }
    super(finalConfig)
    this.loadURL(urlLocation)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

module.exports = AppWindow