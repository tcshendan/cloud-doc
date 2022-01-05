/*
 * @Descripttion: 
 * @Author: shendan
 * @Date: 2022-01-05 15:20:08
 * @LastEditors: shendan
 * @LastEditTime: 2022-01-05 15:22:15
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