import React from 'react';

import { Divider, Rate, Icon, Avatar } from 'antd';
import Href from '../../../components/Href';
import MyIcon from '../../../components/Icon';

const skills = [
  {
    label: '',
    rate: 0,
  }
]

const MyInfo = () => {
  return (
    <>
      <Divider orientation='left'>简述</Divider>
      <p> react  dvajs  antd  koa2 sequelize mysql</p>
      <p>
        源码地址：<Href href='https://github.com/lcmomo/myblogs_client'>github</Href>
        仅供个人学习使用，不做他用
      </p>
      <Divider orientation='left'>关于我</Divider>

      <ul className='about-list'>
        <li>网名: 夙兮执梦</li>
        <li> 学历专业: 本科 计算机科学与技术</li>
        <li>
          联系：
          <Icon type='qq' /> 2485426408
          <Divider type='vertical' />
        </li>
      </ul>
    </>
  )
}

export default MyInfo;
