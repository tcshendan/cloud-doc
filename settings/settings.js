/*
 * @Descripttion: 
 * @Author: shendan
 * @Date: 2022-01-19 09:40:43
 * @LastEditors: shendan
 * @LastEditTime: 2022-01-19 11:13:58
 */
const remote = window.require('@electron/remote')
const Store = window.require('electron-store')
const settingsStore = new Store({ name: 'Settings Data' })

const $ = (id) => {
  return document.getElementById(id)
}

document.addEventListener('DOMContentLoaded', () => {
  let savedLocation = settingsStore.get('savedFileLocation')
  if (savedLocation) {
    $('saved-file-location').value = savedLocation
  }
  $('select-new-location').addEventListener('click', () => {
    remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
      message: '选择文件的储存路径'
    }).then(result => {
      const paths = result.filePaths
      if (Array.isArray(paths)) {
        $('saved-file-location').value = paths[0]
        savedLocation = paths[0]
      }
    })
  })
  $('settings-form').addEventListener('submit', () => {
    settingsStore.set('savedFileLocation', savedLocation)
    remote.getCurrentWindow().close()
  })
})