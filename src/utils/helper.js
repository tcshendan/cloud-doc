/*
 * @Descripttion: 
 * @Author: shendan
 * @Date: 2022-01-05 15:20:08
 * @LastEditors: shendan
 * @LastEditTime: 2022-01-17 14:57:41
 */
export const flattenArr = (arr) => {
  return arr.reduce((map, item) => {
    map[item.id] = item
    return map
  }, {})
}

export const objToArr = (obj) => {
  return Object.keys(obj).map(key => obj[key])
}

export const getParentNode = (node, parentClassName) => {
  let current = node
  while (current !== null) {
    if (current.classList.contains(parentClassName)) {
      return current
    }
    current = current.parentNode
  }
  return false
}