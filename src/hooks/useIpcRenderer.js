/*
 * @Descripttion: 
 * @Author: shendan
 * @Date: 2022-01-18 16:15:52
 * @LastEditors: shendan
 * @LastEditTime: 2022-01-18 16:20:19
 */
import { useEffect } from 'react'
const { ipcRenderer } = window.require('electron')

const useIpcRenderer = (keyCallbackMap) => {
  useEffect(() => {
    Object.keys(keyCallbackMap).forEach(key => {
      ipcRenderer.on(key, keyCallbackMap[key])
    })
    return () => {
      Object.keys(keyCallbackMap).forEach(key => {
        ipcRenderer.removeListener(key, keyCallbackMap[key])
      })
    }
  })
}

export default useIpcRenderer