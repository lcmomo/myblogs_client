import React from 'react'
import { Icon } from 'antd'

//iconfont svg
const SvgIcon = props => {
  return (
    <Icon type = { props.type} className={`svg-icon ${props.className}` } aria-hidden='true' style={props.style} />
  )
}

export default SvgIcon