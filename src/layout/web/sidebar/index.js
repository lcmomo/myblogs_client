import React, { Component }from 'react'
import { SIDEBAR } from '../../../config.js'
// import { request } from '../../../utils/axios'
import { Icon, Divider, Tag } from 'antd';
import { connect } from 'dva';
//components
import { Link } from 'dva/router';
import Href from '../../../components/Href';

// import axios from 'axios';

const HOME_PAGE_ICONS_LIST = [
  {
    key: 'github',
    value : <Icon type='github' theme='filled' className='homepage-icon' />
  }
]

@connect(({article, tag }) => ({
  article: article,
  tag: tag
}
))
export default class SideBar extends Component {
  constructor () {
    super();
    this.state = {
      articleList: [],
      tagList: []
    }
  }

  componentDidMount () {
    this.getTagList();
    this.getArticleList();
  }


  getTagList() {

    // try {
    //   axios.get('http://localhost:3002/tag/list', { params: { order: 'viewCount DESC', page: 1, pageSize: 6 } }).then(res => {
    //     console.log(res);
    //     const { code, data } = res.data;
    //     if (code === 200)
    //     this.setState({ articleList: data.rows })
    //   })
    // } catch (error) {
    //   console.error(error)
    // }
    let res = {};
    this.props.dispatch({
      type: 'tag/fetchTagList',
      payload: {

      },
      callback: result => {
        res = result
        this.setState({ ...this.state, ...result })
      }
    })
    return res;

  }

  getArticleList() {
    // try {
    //   axios.get('http://localhost:3002/article/list', { params: { order: 'viewCount DESC', page: 1, pageSize: 6 } }).then(res => {
    //     console.log(res);
    //     const { code, data } = res.data;
    //     if (code === 200)
    //     this.setState({ articleList: data.rows })
    //   })
    // } catch (error) {
    //   console.error(error)
    // }
    this.props.dispatch({
      type: 'article/fetchArticleList',
      payload: {
        pageSize: 6,
        pageNo: 1,
        order: 'viewCount DESC'
      },
      callback: result => {
        this.setState({ ...result })
      }
    })

  }

  render(){

    const renderHomePagesIcon = key =>{
      const target = HOME_PAGE_ICONS_LIST.find(d => d.key === key);
      return target && target.value;
    }
    // const { articleList, } = this.state;
    const { articleList , tagList } = this.state;
    return (
      <div className='app-sidebar'>
        <img src={ SIDEBAR.avatar } className='sider-avatar' alt='' />
        <h2 className='title'>{ SIDEBAR.title }</h2>
        <h5 className='sub-title'>{ SIDEBAR.subTitle }</h5>
        <ul className='home-pages'>
          {Object.keys(SIDEBAR.homepages).map(key => (
            <li key={key}>
              {renderHomePagesIcon(key)}
              <Href href={SIDEBAR.homepages[key]}>{key}</Href>
            </li>
          ))}
        </ul>
        <Divider orientation='left'>推荐</Divider>
        <ul className='article-list'>

        { articleList && articleList.map(d => (
            <li key={d.id}>
              <Link to={`/web/article/${d.id}`}>{d.title}</Link>
            </li>
          ))}
        </ul>
        <Divider orientation='left'>标签</Divider>
        <div className='tag-list'>
        {
          tagList && tagList.map((tag, i) => (
            <Tag key={ i } color={ tag.color }>
              <Link to="/">{ tag.name }</Link>
            </Tag>
          ))
          }
      </div>
    </div>
    )


  }
}
