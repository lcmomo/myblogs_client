import React from 'react'

export const LOGO_AVATAR=require('./assets/images/logo.png') 
// project config
export const HEADER_BLOG_NAME = '夙兮执梦' // header title 显示的名字
// === sidebar
export const SIDEBAR = {
  avatar: require('./assets/images/blog_avatar.jpg'), // 侧边栏头像
  title: '夙兮执梦', // 标题
  subTitle: '搬砖工', // 子标题
  // 个人主页
  homepages: {
    github: 'https://github.com/lcmomo',
    juejin: 'https://juejin.im/user/5acac6c4f265da2378408f92'
  }
}

// === discuss avatar
export const DISCUSS_AVATAR = SIDEBAR.avatar // 评论框博主头像

export const GITHUB = {
  enable: true, // github 第三方授权开关
  client_id: 'c6a96a84105bb0be1fe5', // Setting > Developer setting > OAuth applications => client_id
  url: 'https://github.com/login/oauth/authorize', // 跳转的登录的地址
  loadingType: 1
}