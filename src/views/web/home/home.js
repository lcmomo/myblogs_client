import React, { Component,useEffect } from 'react'

import { connect } from 'dva'
import { Link } from 'dva/router'
import moment from 'moment'

// components
import { Icon, Divider, Empty, Drawer, Tag, Spin } from 'antd'
import './home.less'
import { get ,remove} from '../../../utils/storage'
import { decodeQuery, translateMarkdown, calcCommentsCount } from '../../../utils/index'
import MyIcon from '../../../components/Icon'
import ArticleTag from '../../../components/ArticleTag'
import Pagination from '../../../components/Pagination'
 class Home extends Component {
    constructor(props){
      super(props);
      this.state={
        list:[],
        total:0,
        loading:false,
        drawerVisible:false,
        windowWidth: 1366
      }
    }

    componentDidMount(){
      const params=decodeQuery(this.props.location.search)
      this.props.dispatch({
        type: 'init/getWindowWidth'
      }).then(res => {
        console.log('window', res)
      })

    this.fetchArticleList(params)
    }

    async fetchArticleList({page,size=40,keyword}){
      const queryParams = { page, size }
      if (keyword) queryParams.keywords = keyword
      let res={}
      await this.props.dispatch({
        type:'article/fetchArticleList',
        payload:{
          ...queryParams
        },
        callback:(res)=>{
        
        }
      }).then(res => {
        console.log(res)
      })
    }


    preView({list,showTitle = true}){
      return (
        <ul className='preview'>
          {showTitle && <Divider>文章列表</Divider>}
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

    handlePageChange = (page,size) => {
      document.querySelector('.app-main').scrollTop = 0
      console.log(page,size)
      const queryParams = { page,size }
      this.fetchArticleList(queryParams)
      // const params = { ...decodeQuery(this.props.location.search), page }
      // let url
      // Object.entries(params).forEach(item => {
      //   url = !url ? `?${item[0]}=${item[1]}` : `${url}&${item[0]}=${item[1]}`
      // })
      // this.props.history.push(url)
  
    }
    handleSizeChange = (page,size) => {
      console.log(page,size)
      const queryParams = { page,size }
      this.fetchArticleList(queryParams)
    }
    
    render() {

      console.log(this.props.article)
      const { page, keyword } = decodeQuery(this.props.location.search)
      const { loading }=this.state
      const { articleList, total , pageNum, pageSize }  = this.props.article
      const list = articleList && articleList.length > 0 ? articleList : this.state.list
      
      return (
        <Spin tip="Loading..." spinning={ loading }>
          <div className='app-home'>
            <ul className='app-home-list'>
              {
               list.length && list.map(item => (
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
                    <span style={{ marginRight: 5 }}> {calcCommentsCount(item.commentList)}</span>
                    <MyIcon type='eye' style={{marginRight:5 }} />
                    <span>{item.viewCount}</span>

                    <ArticleTag 
                    tagList={ item.tagList } 
                    categoryList={item.categoryList}
                     />

                    </div>
                  </li>
                ))
              }
            </ul>
            {
              list.length > 0 ? (
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

            <Pagination current={parseInt(pageNum) || 1} onChange={this.handlePageChange} onShowSizeChange={this.handleSizeChange} total={total || this.state.total} windowWith={ 1366  } pageSize={pageSize || 10 } showSizeChanger />

          </div>
        </Spin>
      )
    }
  }

export default connect(({article,init})=>({article,windowWith:init.windowWith}))(Home)