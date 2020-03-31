import React, { useState } from 'react'
import { Input, Icon, Row } from 'antd'
import { withRouter } from 'dva/router'
import { connect } from 'dva'


function SearchButton(props) {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = () => {
    if (keyword) 
    props.dispatch({
      type:'article/findBKeywords',
      payload:{
        page:1,
        keywords:keyword
      }
    })

  }

  const handleChange = e => {
    setKeyword(e.target.value)
  }

  const handlePressEnter = e => {
    e.target.blur()
  }

  return (
    <div id='search-box'>
      <Icon type='search' className='search-icon' onClick={e => props.dispatch({
        type:'article/findBKeywords',
        payload:{
          page:1,
          keywords:keyword
        }
      })} />
      <Input
        type='text'
        value={keyword}
        onChange={handleChange}
        onBlur={handleSubmit}
        onPressEnter={handlePressEnter}
        className='search-input'
        placeholder='搜索文章'
        style={{ width: 200 }}
      />
    </div>
  )
}

export default connect(({article}) => (article))(withRouter(SearchButton))