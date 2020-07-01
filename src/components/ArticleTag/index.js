import React from 'react'
import PropTypes from 'prop-types'
import { withRouter,Link } from 'dva/router'
import { connect } from 'dva'
import {Icon,Tag,Divider } from 'antd'

function getColor(name,colorList) {
  console.log(colorList)
  const target = colorList.find(c => c.name === name)
  return target ? target.color : ''
}

const ArticleTag = ({ tagList,categoryList,tagColorList }) => {
  return (
    <>
    { tagList && tagList.length > 0 && (
      <>
        <Divider type='vertical' style={{ marginRight: 7}} />
        <Icon type='tag' style={{ marginRight: 7}} />
        {
          tagList.map((tag,i) => (
            <Tag key={i} color = {getColor(tag.tagName,tagColorList)} >
              <Link to={`/tags/${tag.tagName}`}>{tag.tagName}</Link>
            </Tag>
          ))
        }
      </>
    )}

    {categoryList && categoryList.length > 0 && (
            <>
              <Divider type='vertical' style={{ marginRight: 7 }} />
              <Icon type='folder' style={{ marginRight: 7 }} />
              {categoryList.map((cate, i) => (
                <Tag key={i} color='#2db7f5'>
                  <Link to={`/categories/${cate.categoryName}`}>{cate.categoryName}</Link>
                </Tag>
              ))}
            </>
          )}
        </>
  )
}

ArticleTag.propTypes = {
 // tagList: PropTypes.array.isRequired,
  // categoryList: PropTypes.array.isRequired
}

export default connect(({article, init})=>({ article,windowWith:init.windowWith, tagColorList: article.tagList}))(withRouter(ArticleTag))