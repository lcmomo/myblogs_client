import xss from 'xss';
import marked from 'marked';
import hljs from 'highlight.js';
import { clear, get } from './storage';

import pathToRegexp from 'path-to-regexp';



/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:|http:)/.test(path)
}

//获取运行环境
export const getItemEnv = () => {
  return process.env.NODE_ENV;
}

// 获取 token
export function getToken() {
  let token = ''
  const userInfo = get('userInfo');

  if (userInfo && userInfo.token) {
    token = 'chao ' + userInfo.token;
  }

  return token;
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

// 取数组中的随机数
export const randomIndex = arr => Math.floor(Math.random() * arr.length)

/**
 * 对数组进行分组
 * @param {Array} arr - 分组对象
 * @param {Function} f
 * @returns 数组分组后的新数组
 */
export const groupBy = (arr, f) => {
  const groups = {}
  arr.forEach(item => {
    const group = JSON.stringify(f(item))
    groups[group] = groups[group] || []
    groups[group].push(item)
  })
  return Object.keys(groups).map(group => groups[group])
}


//统计每个标签及数目
export const getTagsCount = (rowList) => {

  let resList=[]

  let tagNameList=[]
  rowList.forEach((row, index)=>{
    let tag = {}
    // console.log(row.tagName)
    if ((tagNameList.indexOf(row.name) < 0)) {
      tag.name = row.name
      tag.count = 1;
      tagNameList.push(row.name)
      // console.log(tagNameList)
      resList.push(tag)

      //resList[row.tagName].count++
    }else {
        resList.forEach((r, idx) => {
          if (r.name === row.tagName){
            r.count ++;
          }
        })
    }
//     console.log(tagNameList)
}
  )

  return resList
}


// 获取 url query 参数
export const decodeQuery = url => {
  const params = {}
  const paramsStr = url.replace(/\.*\?/, '') // a=1&b=2&c=&d=xxx&e
  paramsStr.split('&').forEach(v => {
    const d = v.split('=')
    if (d[1] && d[0]) params[d[0]] = d[1]
  })
  return params
}

//转化md语法为html
export const translateMarkdown = (plainText,isGuardXss = false)=> {
  return marked(isGuardXss ? xss(plainText) : plainText, {
    renderer:new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    highlight: function(code) {
      /*eslint no-undef: "off"*/
      return hljs.highlightAuto(code).value
    }
  })
}

// 计算 评论数
export const calcCommentsCount = commentList => {
  let count = 0;
  if (commentList) {
  commentList.forEach(item => {
    count += 1;
    if (item.replies){
      count += item.replies.length;
    }
  })
}
  return count;
}


export const baseUrl =  getItemEnv() === "development" ? `http://localhost:3002` : `http://www.llchaoblogs.work:3002`;

export const pathParams = (urlPattern, pathname) => {
  const match = pathToRegexp(urlPattern).exec(pathname);
  return match;
}