import React from 'react';
import MyInfo from './views/web/about/MyInfo.js';
export const LOGO_AVATAR=require('./assets/images/logo.png');
// project config
export const HEADER_BLOG_NAME = '夙兮执梦'; // header title 显示的名字
// === sidebar
export const SIDEBAR = {
  avatar: require('./assets/images/blog_avatar.jpg'), // 侧边栏头像
  title: '夙兮执梦', // 标题
  subTitle: '搬砖工', // 子标题
  // 个人主页
  homepages: {
    github: 'https://github.com/lcmomo',
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

export const ITEM_NAME = "myblogs-1.0";

export const API_BASE_URL = 'http://localhost:8080';

export const ABOUT = {
  avatar: SIDEBAR.avatar,
  describe: SIDEBAR.subTitle,
  discuss: true, //  关于页面是否开启讨论
  renderMyInfo: <MyInfo />
}
