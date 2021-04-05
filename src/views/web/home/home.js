import React, { Component } from 'react'

import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';

// components
import { Divider, Empty, Spin } from 'antd';
import './home.less';
import { get ,remove } from '../../../utils/storage';
import { decodeQuery, translateMarkdown, calcCommentsCount } from '../../../utils/index';
import MyIcon from '../../../components/Icon';
import ArticleTag from '../../../components/ArticleTag';
import Pagination from '../../../components/Pagination';
 class Home extends Component {
    constructor(props){
      super(props);
      this.state = {
        list: [],
        total: 0,
        loading: false,
        drawerVisible: false,
        windowWidth: 1366
      }
    }

    componentDidMount(){
      const params = decodeQuery(this.props.location.search);
      // this.props.dispatch({
      //   type: 'init/getWindowWidth'
      // }).then(res => {
      //   console.log('window', res)
      // })
      console.log("params: ", params)

      this.fetchArticleList(params);
      params.code &&
      this.props.login(params).then(() => {
        const url = get('prevRouter')
        if (url) {
          this.props.history.push(url);
        }
      })
    }

    async fetchArticleList({ pageNo, pageSize = 10, keyword }){
      const queryParams = { pageNo, pageSize };
      if (keyword) queryParams.keyword = keyword;
      this.setState({...this.state, loading: true })
      await this.props.dispatch({
        type: 'article/fetchArticleList',
        payload: {
          ...queryParams
        },
        callback: (result) => {
          // this.setState({ ...this.state, ...result, loading: false});
          console.log("result: ", result)
          this.setState((state) => ({ ...state, ...result, loading: false }))
        }
      }).then(res => {
        console.log(res)
      })
    }


    preView ({list, showTitle = true}) {
      return (
        <ul className='preview'>
          {showTitle && <Divider>文章导航</Divider>}
          {
            list.map(item => (
              <li key={item.id}>
                <Link to={`/web/article/${item.id}`}>
                  {item.title}
                </Link>
              </li>
            ))
          }
        </ul>
      )
    }
    NoDataDesc({keyword}){
      return keyword ? (
        <span>
          不存在标题/内容包含<span className='keyword'>{keyword}</span>的文章
        </span>
      ) :(
        <span> 暂无数据...</span>
      )
    }
 
    jumpTo(id){
      this.props.history.push(`/web/article/${id}`)
    }

    handlePageChange = (pageNo) => {
      document.querySelector('.app-main').scrollTop = 0;
      const params = { ...decodeQuery(this.props.location.search), pageNo }
      let url= '';
        Object.entries(params).forEach(item => {
          url = !url ? `?${item[0]}=${item[1]}` : `${url}&${item[0]}=${item[1]}`
        })
        this.props.history.push(url)
      // this.fetchArticleList(queryParams);
      // const params = { ...decodeQuery(this.props.location.search), page }
      // let url
      // Object.entries(params).forEach(item => {
      //   url = !url ? `?${item[0]}=${item[1]}` : `${url}&${item[0]}=${item[1]}`
      // })
      // this.props.history.push(url)

    }
    handleSizeChange = (page, size) => {
      console.log(page, size)
      const queryParams = { page, size };
      this.fetchArticleList(queryParams);
    }
    render() {
      const { pageNo, keyword } = decodeQuery(this.props.location.search);
      const { loading } = this.state;
      const { articleList, total, tagColorList }  = this.state;
      const list = articleList && articleList.length > 0 ? articleList : this.state.articleList;
      console.log("articleList: ", this.state.articleList)
      console.log("this.state: ", this.state)
      return (
        <Spin tip="Loading..." spinning={ loading }>
          <div className='app-home'>
            <ul className='app-home-list'>
              {
               list && list.length && list.map(item => (
                  <li key={item.id} className='app-home-list-item'>
                    <Divider orientation='left'>
                      <span className='title' onClick={()=>this.jumpTo(item.id)}>
                        {item.title}
                      </span>
                      <span className='posted-time'>{moment(item.createTime).format('YYYY-MM-DD')}</span>
                    </Divider>
                    <div
                      onClick={() => this.jumpTo(item.id)}
                      className='article-detail content'
                      dangerouslySetInnerHTML={{__html: translateMarkdown(item.content)}}

                      />
                    {/* { item.content} */}
                    <div className='list-item-others'>
                    <MyIcon type='message' />
                    <span style={{ marginRight: 5 }}> {calcCommentsCount(item.comments)}</span>
                    <MyIcon type='eye' style={{marginRight:5 }} />
                    <span>{item.viewCount}</span>

                    <ArticleTag
                    tagList={ item.tags }
                    categoryList={ item.categories }
                    tagColorList = { tagColorList }
                     />

                    </div>
                  </li>
                ))
              }
            </ul>
            {
              list && list.length > 0 ? (
                <>
                {
                // this.state.windowWidth > 1300
                 (
                  <this.preView list={list} />
                )}
                </>
              ) : (
                <>
                {keyword && (
                  <div className='no-data'>
                    <Empty description={<this.NoDataDesc keyword={keyword} />} />
                  </div>
                )}
              </>
              )
            }

            <Pagination current={pageNo? parseInt(pageNo, 0) : 1} onChange={ (pageNo) => this.handlePageChange(pageNo) } onShowSizeChange={this.handleSizeChange} total={total || this.state.total} windowWith={ 1366  } showSizeChanger />
          </div>
        </Spin>
      )
    }
  }

export default connect(({article,init})=>({article,windowWith:init.windowWith}))(Home)