/*
 * @Descripttion: 
 * @Author: shendan
 * @Date: 2021-11-23 10:01:01
 * @LastEditors: shendan
 * @LastEditTime: 2022-01-04 17:16:23
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
      nodeIntegration: true
    }
  })
  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl'
  mainWindow.loadURL(urlLocation)
  mainWindow.webContents.openDevTools({ mode: 'detach' })
})