import React,{useEffect,useState,Component}from 'react'
import {SIDEBAR} from '../../../config.js'
//import {request} from '../../../utils/axios'
import {connect } from 'dva'
import {Icon,Divider,Tag} from 'antd'

//components
import {Link} from 'dva/router'
import SvgIcon from '../../../components/SvgIcon'
import Href from '../../../components/Href'

const HOME_PAGE_ICONS_LIST=[
  {
    key:'github',
    value :<Icon type='github' theme='filled' className='homepage-icon' />
  }
]

//  function SideBar(props) {
//   const [articleList, setArticleLst] = useState([])

//   // useEffect(() => {
//   //   console.log("获取文章列表")
//   //   // return () => {
//   //   //  console.log("完成")
//   //   // };
//   // }, [])

//   //渲染个人主页图标
//   const renderHomePagesIcon = key =>{
//     const target=HOME_PAGE_ICONS_LIST.find(d=>d.key===key)
//     return target && target.value
//   }

//   console.log("SIDEBAR")

//   return (
//     <div className='app-sidebar'>
//       sidebar
//     <img src={SIDEBAR.avatar} className='sider-avatar' alt='' />
//     <h2 className='title'>{SIDEBAR.title}</h2>
//     <h5 className='sub-title'>{SIDEBAR.subTitle}</h5>
//     <ul className='home-pages'>
//       {Object.keys(SIDEBAR.homepages).map(key => (
//         <li key={key}>
//           {renderHomePagesIcon(key)}
//           <Href href={SIDEBAR.homepages[key]}>{key}</Href>
//         </li>
//       ))}
//     </ul>

//     <Divider orientation='left'>热门文章</Divider>
//     <ul className='article-list'>
     
//       热门文章
//     </ul>

//     <Divider orientation='left'>标签</Divider>
//     <div className='tag-list'>
     
//       标签
//     </div>
//   </div>
//   )
// }


// export default connect(({user,tag})=>({user}))(SideBar)








class SideBar extends Component{
  constructor(props){
    super(props)
    this.state={
      articleList:[],
      setArticleLst:[]
    }
  }

  componentDidMount(){
    this.getTagList();
    this.getArticleList();
  }

  async getTagList(){
    let res={};
    await this.props.dispatch({
      type:'tag/fetchTagList',
      payload:{

      },
      callback:result => {
        res = result
      }
    }).then()
    return res;

  }

  async getArticleList(){
    let res={};
    await this.props.dispatch({
      type:'article/fetchArticleList',
      payload:{
        size:6,
        orderby:'viewCount DESC'
      },
      callback:result => {
        res = result
      }
    }).then()
    return res;

  }

  render(){

    const renderHomePagesIcon = key =>{
      const target=HOME_PAGE_ICONS_LIST.find(d=>d.key===key)
      return target && target.value
    }

    const { tag: { tagList },article:{articleList} } = this.props
    
    
    //console.log(tagList)

    return (
      <div className='app-sidebar'>
       
      <img src={SIDEBAR.avatar} className='sider-avatar' alt='' />
      <h2 className='title'>{SIDEBAR.title}</h2>
      <h5 className='sub-title'>{SIDEBAR.subTitle}</h5>
      <ul className='home-pages'>
        {Object.keys(SIDEBAR.homepages).map(key => (
          <li key={key}>
            {renderHomePagesIcon(key)}
            <Href href={SIDEBAR.homepages[key]}>{key}</Href>
          </li>
        ))}
      </ul>
  
      <Divider orientation='left'>热门文章</Divider>
      <ul className='article-list'>
       
      { articleList&&articleList.map(d => (
          <li key={d.id}>
            <Link to={`/article/${d.id}`}>{d.title}</Link>
          </li>
        ))}
      </ul>
  
      <Divider orientation='left'>标签</Divider>
      <div className='tag-list'>
       {
        tagList&&tagList.map((tag,i) => (
          <Tag key ={i} color={tag.color}>
            <Link to="/">{tag.tagName}</Link>
          </Tag>
        ))
        }
      </div>
    </div>
    )
  

  }
}

export default connect(({user,tag,article})=>({user,tag,article}))(SideBar)