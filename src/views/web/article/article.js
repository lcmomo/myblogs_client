import React, { Component } from 'react'
import './article.less'
import request from '../../../utils/request'
import { translateMarkdown, calcCommentsCount, pathParams } from '../../../utils/index'

// components
import { Comment, Avatar, Form, Button, Divider, Input, Icon, Menu, Dropdown, message, Modal, Spin, Drawer } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import ArticleTag from '../../../components/ArticleTag'
import { AppAvatar } from '../../../components/Avatar';
 import MyIcon from '../../../components/Icon';

import Discuss from '../../../components/Discuss';
import Navigation from './Navigation';


class Article extends Component {
  constructor() {
    super();
    this.state = {
      article: {
        title: '',
        content: '',
        tags: [],
        categories: [],
        comments: [],
        createdAt: '',
        viewCount: 0,
      },
      loading: true,
      drawerVisible: false,
      articleId: -1
    }
  }

  componentDidMount() {
    const _this = this;
    const { location: { pathname } } = this.props;
    setTimeout(()=> {
      const target = decodeURI(this.props.location.hash);
      console.log('target: ', target)
      const ele = document.querySelector(`a[href="${target}"]`);
      console.log("ele: ", ele)
      ele && ele.click();
    }, 1000);

    this.fetchArticleById();
  }
  fetchArticleById () {
   const { location: { pathname } } = this.props;
   console.log("article props: ", this.props)
   const routeParam = pathParams('/web/article/:id', pathname);
   this.props.dispatch({
     type: 'article/fetchArticleDetail',
     payload: routeParam[1],
     callback: result => {
       result.content = translateMarkdown(result.content);
       this.setState((state) => ({...state, loading: false, article: result, articleId: routeParam[1] }))
     }
   })
  }

  setCommentList (list) {
    let { article } = this.state;
    article.comments = list;
    this.setState({ article })
  }

  render() {
    const { article: {title, content, tags, categories, comments, createdAt, viewCount }, articleId, loading } = this.state;
    const isFoldNavigation = window.innerWidth < 1300;
    const { location: { pathname } } = this.props;
    return (
      <Spin tip="loading..." spinning={loading}>
        <div className="app-article" style={{ paddingRight: isFoldNavigation ? 0: 265 }}>
          <div className="post-header">
            <h1 className="post-title">{ title }</h1>

            <div className="article-desc">
              <span className="post-time">
                <MyIcon type="edit" />
                &nbsp; Posted on &nbsp;
                <span>{ createdAt.slice(0, 10) }</span>
              </span>
              <ArticleTag tagList={tags} categoryList={categories} />
              <Divider type='vertical' />
              <a className='comment-count' href='#discuss' style={{ color: 'inherit' }}>
                <MyIcon type='message' />
                <span style={{ marginRight: 5, marginLeft: 5, display: "inline-block" }}>
                { calcCommentsCount(comments) }
                </span>
              </a>
                <MyIcon type='eye' />
                <span >{ viewCount }</span>
            </div>
          </div>
          <div className='article-detail' dangerouslySetInnerHTML={{ __html: content}}></div>

            { isFoldNavigation ? (
              <>
                <div className='drawer-btn' onClick={e => this.setState({drawerVisible: true })}>
                  <Icon type='menu-o' className='nav-phone-icon' />
                </div>
                <Drawer
                  title={title}
                  placement='right'
                  closable={ false }
                  onClose={ e => this.setState({ drawerVisible: false })}
                  visible={this.state.drawerVisible}
                  getContainer={() => document.querySelector('.app-article')}
                >
                  <div className='right-navigation'>
                    <Navigation content={content} pathname={pathname} />
                  </div>
                </Drawer>
              </>
            )
          :(
            <div className='article-navigation'>
              <Navigation content={content} pathname={pathname} />
            </div>
            )}
            <Discuss articleId={articleId} commentList={comments} setCommentList={(res)=> {
              console.log("article res", res)
              this.setCommentList(res)
            }} />
        </div>
      </Spin>
    )
  }
}

export default connect(({ article }) => ({ article }))(Article);
