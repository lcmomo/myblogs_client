import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

//iconfont svg
const SvgIcon = props => {
  return (
    <Icon type = { props.type} className={`svg-icon ${props.className}` } aria-hidden='true' style={props.style} />
  )
}

// SvgIcon.propTypes = {
//   type: PropTypes.string.isRequired,
//   className: PropTypes.string
// }

// SvgIcon.defaultProps = {
//   className: ''
// }

export default SvgIcon