import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {Link,withRouter} from 'dva/router'
import {Menu,Icon} from 'antd'

import navList from './navList.js'

@withRouter
 class Navbar extends Component {

  static propTypes = {
    navList: PropTypes.array,
    mode: PropTypes.string
  }

  static defaultProps = {
    mode: 'horizontal'
  }

  render() {
    return (
      <Menu mode='horizontal' selectedKeys={[this.props.location.pathname]} className='header-nav'>
      {navList.map(nav => (
        <Menu.Item key={nav.link}>
          <Link to={nav.link}>
            {nav.icon && <Icon type={nav.icon} />}
            <span className='nav-text'>{nav.title}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
    )
  }
}

export default Navbar