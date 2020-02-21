import React from 'react'
import { isExternal} from '../../utils/index.js'

//a 标签跳转新窗口
export default function Href({children,href, ...rest }) {
  let url=href
  if(!isExternal(href)){
    url = `http://${href}`
  }
  return (
    <a target='_blank' rel='noreferrer noopener' {...rest} href={url}> 
      {children}
    </a>
  )
}
