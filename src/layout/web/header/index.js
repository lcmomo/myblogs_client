import React, { useState, Component } from 'react';
import { Layout, Row, Col, Input, Icon, Menu,  Button, Dropdown,} from 'antd';
import { connect } from 'dva';
import { Link, withRouter } from 'dva/router'
import { HEADER_BLOG_NAME,LOGO_AVATAR } from '../../../config.js';
import navList from './navList.js';
import SignModal from '../../../components/SignModal';
import AppAvatar from '../../../components/Avatar'

const Header = Layout.Header;


//响应式
const responsiveLeft = {xxl: 4, xl: 5, lg:5, sm: 4, xs: 24};
const responsiveRight = { xxl: 20, xl: 19, lg: 19, sm: 20, xs: 0 };

const Logo = () => {
    return (
      <div className='header-left'>
        <img src={ LOGO_AVATAR } style={{ width: 25, height: 25, marginBottom: 5}}/>
        <span className='blog-name'>{ HEADER_BLOG_NAME }</span>
      </div>
    )
}




class WebHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      SignModalShow: false,
      UploadModalShow: false,
      ResultModalSHow: false,
      type:''
    }
  }


 SearchModel = () => {
   const { keyword } = this.state;
    return (
      <div id='search-box'>
        <Icon type='search' className='search-icon' />
        <Input
          type='text'
          value={ keyword }
          onChange={ (e) => this.handleChange(e) }
          onBlur={ () => this.handleSubmit() }
          onPressEnter={ (e) => this.handlePressEnter(e) }
          className='search-input'
          placeholder='搜索文章'
          style={{ width: 200 }}
        />
      </div>
    )
  }

  Navbar = () => {
    return(
      <Menu mode='horizontal' selectedKeys={[ this.props.location.pathname]} className='header-nav'>
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

  handleChange = e => {
    this.setState({ keyword: e.target.value }
      )
  }

  handlePressEnter = e => {
    e.target.blur()
  }

  handleSubmit = () => {
    const { keyword } = this.state;
    if (keyword){
      this.props.history.push(`/web/home?pageNo=1&keyword=${keyword}`);
    }

  }

  ShowLoginModal (type) {
    this.props.dispatch({
      type: 'init/switchSignModal',
      payload: {
        type: 'login',
        visible: true,
      }
    });
  }
  ShowRegisterModal(type) {
    this.props.dispatch({
      type: 'init/switchSignModal',
      payload: {
        type: 'register',
        visible: true,
      }
    })
  }
  HiddenSignModal () {
    this.props.dispatch({
      type: 'init/switchSignModal',
      payload: {
        visible: false,
      }
    })
  }



  render () {
    const { userInfo, username, github, role } = this.props.user;
  //const {username,github,role } =this.props.userInfo
    const { SignModalShow, UploadModalShow, ResultModalSHow } = this.state;
 

    const MenuOverLay = (
      <Menu>
        {role === 1 && (
          <Menu.Item>
            <span onClick={e => console.log("导入文章")}>导入文章</span>
          </Menu.Item>
        )}
        {role === 1 && (
          <Menu.Item>
            <span onClick={e => this.props.history.push('/admin')}>后台管理</span>
          </Menu.Item>
        )}
        <Menu.Item>
          <span className='user-logout' onClick={
            ()=>this.props.dispatch({
              type:'user/logout'
          })}>
            退出登录
          </span>
        </Menu.Item>
      </Menu>
    )

    return (
      <Header className='app-header'>
        <Row>
          <Col {...responsiveLeft}>
          <Logo />
          </Col>
          <Col {...responsiveRight}>
          <div className='header-right'>
            { this.SearchModel() }
            <div className='header-userInfo'>
              { username ? (
                <Dropdown placement='bottomCenter' overlay={MenuOverLay} trigger={['click', 'hover']}>
                  <div style={{ height: 55 }}>
                    <AppAvatar userInfo={ userInfo } popoverVisible={ false } />
                  </div>
                </Dropdown>
              ) : (
                <>
                  <Button
                    ghost
                    type='primary'
                    size='small'
                    style={{ marginRight: 20 }}
                    onClick={
                      e => this.ShowLoginModal()
                    }>
                    登录
                  </Button>
                  <Button ghost type='danger' size='small' onClick={ e=> this.ShowRegisterModal() }>
                    注册
                  </Button>
                </>
              )}
            {/* { SignModalShow && <SignModal visible = { SignModalShow } onCancel = { () => this.HiddenSignModal() } type={this.state.type} succeedCallBack={ this.HiddenSignModal} /> } */}
            <SignModal />
              {/* <UploadModal />
              <ResultModal /> */}
            </div>
            {/* 导航 */}
            { this.Navbar() }
          </div>

            {/* <Right /> */}
          </Col>
        </Row>
      </Header>
    )
  }
}

export default connect(({  user, init })=>({ user, init }))(withRouter(WebHeader))