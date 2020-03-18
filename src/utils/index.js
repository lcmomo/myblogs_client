import { clear, get } from './storage'
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:|http:)/.test(path)
}

//获取运行环境
export const getItemEnv=()=>{
  return process.env.NODE_ENV;
}

// 获取 token
export function getToken() {
  let token = ''
  const userInfo = get('userInfo')

  if (userInfo && userInfo.token) {
    token = 'Bearer ' + userInfo.token
  }

  return token
}

/**
 * 生成随机 ID
 * @param {Number} len - 长度
 */
export function RandomId(len) {
  return Math.random()
    .toString(36)
    .substr(3, len)
}