import React, { Component } from 'react'
import './article.less'
import { connect } from 'dva'

import request from '../../../utils/request'
import { translateMarkdown,calcCommentsCount , getPathParams} from '../../../utils/index'

// components
import { Drawer, Icon, Divider, Tag, Spin } from 'antd'
import ArticleTag from '../../../components/ArticleTag'
import MyIcon from '../../../components/Icon'
import Navigation from './Navigation'
import Discuss from '../../../components/Discuss'

 class Article extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      article: {
        title: '',
        content: '',
        tags: [],
        categories: [],
        comments: [],
        createdAt: '',
        viewCount: 0,
      },
      drawerVisible: false
    }
  }

  componentDidMount() {
    // const { id } = this.props.history
    this.getArticleDetails()
    console.log(this.props.location)

  }


  async getArticleDetails () {
    const { location : { pathname } } = this.props
    this.setState({loading: true})
    const routeParam = getPathParams('/web/article/:id', pathname)
    await this.props.dispatch({
      type:'article/findArticleDetailById',
      payload: { id: routeParam[1]},
      callback: res => {
        console.log(res)
        res.content = translateMarkdown(res.content || '')
        this.setState({ article: res, loading: false})
      }
    })

  }
  render() {
    // const { articleDetail } = this.props.article
    
    // const content = translateMarkdown(articleDetail.content || '')
    const { title, content, tagList, categoryList, commentList, createdAt, viewCount, id} = this.state.article
    const articleId = id
    const isFoldNavigation = this.props.init.windowWidth < 1300
    return (
      <Spin tip='Loading...' spinning={this.state.loading} />
    )
  }
}


export default connect(({article,init}) => ({article,init}))(Article)