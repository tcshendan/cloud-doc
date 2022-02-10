/*
 * @Descripttion: 
 * @Author: shendan
 * @Date: 2022-01-19 09:40:43
 * @LastEditors: shendan
 * @LastEditTime: 2022-02-10 13:39:31
 */
const remote = window.require('@electron/remote')
const Store = window.require('electron-store')
const settingsStore = new Store({ name: 'Settings Data' })
const qiniuConfigArr = ['#savedFileLocation', '#accessKey', '#secretKey', '#bucketName']

const $ = (selector) => {
  // return document.getElementById(id)
  const result = document.querySelectorAll(selector)
  return result.length > 1 ? result : result[0]
}

document.addEventListener('DOMContentLoaded', () => {
  let savedLocation = settingsStore.get('savedFileLocation')
  if (savedLocation) {
    $('#savedFileLocation').value = savedLocation
  }
  // get the saved config data and fill in the inputs
  qiniuConfigArr.forEach(selector => {
    const savedValue = settingsStore.get(selector.substr(1))
    if (savedValue) {
      $(selector).value = savedValue
    }
  })
  $('$select-new-location').addEventListener('click', () => {
    remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
      message: '选择文件的储存路径'
    }).then(result => {
      const paths = result.filePaths
      if (Array.isArray(paths)) {
        $('#savedFileLocation').value = paths[0]
      }
    })
  })
  $('#settings-form').addEventListener('submit', (e) => {
    e.preventDefault()
    qiniuConfigArr.forEach(selector => {
      if ($(selector)) {
        let { id, value } = $(selector)
        settingsStore.set(id, value ? value : '')
      }
    })
    remote.getCurrentWindow().close()
  })
  $('.nav-tabs').addEventListener('click', (e) => {
    e.preventDefault()
    $('.nav-link').forEach(element => {
      element.classList.remove('active')
    })
    e.target.classList.add('active')
    $('.config-area').forEach(element => {
      element.style.display = 'none'
    })
    $(e.target.dataset.tab).style.display = 'block'
  })
})