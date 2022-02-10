/*
 * @Descripttion: 
 * @Author: shendan
 * @Date: 2021-11-23 10:01:01
 * @LastEditors: shendan
 * @LastEditTime: 2022-02-10 14:43:11
 */
const { app, Menu, ipcMain, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const menuTemplate = require('./src/menuTemplate')
const AppWindow = require('./src/AppWindow')
const Store = window.require('electron-store')
const settingsStore = new Store({ name: 'Settings Data' })
let mainWindow, settingsWindow

app.on('ready', () => {

  const mainWindowConfig = {
    // width: 1024,
    width: 1440,
    height: 768,
  }
  
  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl'
  mainWindow = new AppWindow(mainWindowConfig, urlLocation)
  mainWindow.webContents.openDevTools({ mode: 'detach' })
  require('@electron/remote/main').initialize() // 初始化
  require('@electron/remote/main').enable(mainWindow.webContents)
  mainWindow.on('close', () => {
    mainWindow = null
  })
  // set the menu
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
  // hook up main events
  ipcMain.on('open-settings-window', () => {
    // const settingsWindowConfig = {
    //   width: 500,
    //   height: 400,
    //   parent: mainWindow
    // }
    // const settingsFileLocation = `file://${path.join(__dirname, './settings/settings.html')}`
    // settingsWindow = new AppWindow(settingsWindowConfig, settingsFileLocation)
    // require('@electron/remote/main').enable(settingsWindow.webContents)
    settingsWindow = new BrowserWindow({
      width: 500,
      height: 400,
      parent: mainWindow,
      webPreferences: {
        // 开启node
        nodeIntegration: true,
        contextIsolation: false,
        // 开启remote
        enableRemoteModule: true
      }
    })
    settingsWindow.loadFile('./settings/settings.html')
    require('@electron/remote/main').enable(settingsWindow.webContents)
    settingsWindow.webContents.openDevTools({ mode: 'detach' })
    settingsWindow.removeMenu()
    settingsWindow.on('close', () => {
      settingsWindow = null
    })
  })
  ipcMain.on('config-is-saved', () => {
    // watch out menu items index for mac and windows
    let qiniuMenu = process.platform === 'darwin' ? menu.items[3] : menu.items[2]
    const switchItems = (toggle) => {
      [1, 2, 3].forEach(number => {
        qiniuMenu.submenu.items[number].enabled = toggle
      })
    }
    const qiniuIsConfiged = ['accessKey', 'secretKey', 'bucketName'].every(key => !!settingsStore.get(key))
    if (qiniuIsConfiged) {
      switchItems(true)
    } else {
      switchItems(false)
    }
  })
})