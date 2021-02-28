import React, { Component, useEffect, useState } from 'react'
import './about.less';
import { Avatar } from 'antd';

import axios from 'axios';
import { SIDEBAR, ABOUT } from '../../../config';
import { baseUrl } from '../../../utils/index'

import Discuss from '../../../components/Discuss';

 function About(props) {
  const [ commentList, setCommentList ] = useState([]);

  useEffect(() => {
    const fetchList = () => {
      axios.get(`${ baseUrl }/article/-1`).then(res => {
        const { data: { code, data } } = res;
        console.log(" about article: ", data)
        setCommentList(data.comments)
      })
    }
    ABOUT.discuss && fetchList()
  }, []);


  return (
      <div className='app-about'>
        <Avatar src={SIDEBAR.avatar} />
        <span style={{ paddingLeft: 10 }}>{ABOUT.describe}</span>
        {ABOUT.renderMyInfo || null}
        {ABOUT.discuss && <Discuss articleId={-1} commentList={commentList} setCommentList={setCommentList} />}
      </div>
    )
}


// export default class about extends Component {
 
// }
export default About;