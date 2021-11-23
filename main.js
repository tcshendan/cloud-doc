/*
 * @Descripttion: 
 * @Author: shendan
 * @Date: 2021-11-23 10:01:01
 * @LastEditors: shendan
 * @LastEditTime: 2021-11-23 10:16:56
 */
const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  })
  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl'
  mainWindow.loadURL(urlLocation)
})