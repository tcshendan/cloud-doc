/*
 * @Descripttion: 
 * @Author: shendan
 * @Date: 2021-11-23 10:01:01
 * @LastEditors: shendan
 * @LastEditTime: 2022-01-13 14:44:29
 */
const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    // width: 1024,
    width: 1440,
    height: 768,
    webPreferences: {
      // 开启node
      nodeIntegration: true,
      contextIsolation: false,
      // 开启remote
      enableRemoteModule: true
    }
  })
  require('@electron/remote/main').initialize() // 初始化
  require('@electron/remote/main').enable(mainWindow.webContents)
  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl'
  mainWindow.loadURL(urlLocation)
  mainWindow.webContents.openDevTools({ mode: 'detach' })
})