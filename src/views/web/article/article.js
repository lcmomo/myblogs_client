import React, { Component } from 'react'
import './article.less'
import { connect } from 'dva'

import request from '../../../utils/request'
import { translateMarkdown,calcCommentsCount } from '../../../utils/index'

// components
import { Drawer, Icon, Divider, Tag, Spin } from 'antd'
// import ArticleTag from '../../../components/ArticleTag'
// import SvgIcon from '../../../components/SvgIcon'
// import Navigation from './Navigation'
 import Discuss from '../../../components/Discuss'
export default class article extends Component {
  render() {
    return (
      <div>
        article
      </div>
    )
  }
}
