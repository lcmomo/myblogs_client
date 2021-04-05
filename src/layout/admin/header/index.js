import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

//import { loginout } from '@/redux/user/actions'

import { Button, Icon, Dropdown, Menu } from 'antd'
 import AppAvatar from '../../../components/Avatar'
// import UploadModal from '@/components/UploadModal'
// import ResultModal from '@/components/UploadModal/result'

//import { switchSignModal, switchUploadModal } from '@/redux/app/actions'

function AdminHeader(props) {
  console.log(props)
  const { collapsed, onToggle, user: { userInfo, username, github, role } } = props;


  function backToHome() {
    props.history.push('/web/home')
  }

  const menu = (
    <Menu className='menu'>
      <Menu.Item>
        <span onClick={backToHome}>返回主页</span>
      </Menu.Item>

      {/* <Menu.Item>
        <span onClick={e => props.switchUploadModal(true)}>导入文章</span>
      </Menu.Item> */}

      <Menu.Item>
        <span
          onClick={e => {
            // props.loginout()
           props.dispatch({
             type:'user/logout'
           }).then(()=> backToHome())
          }}>
          退出登录
        </span>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} className='trigger' onClick={onToggle} />
      <div className='header-right'>
        <Dropdown overlay={menu}>
          <span>
            <AppAvatar userInfo={userInfo} popoverVisible={false} />
            
          </span>
          {/* <span>dev</span> */}
        </Dropdown>
      </div>
      {/* <UploadModal />
      <ResultModal /> */}
     
    </>
  )
}

AdminHeader.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func
}

// export default connect(
//   state => ({
//     userInfo: state.user
//   }),
//   {
//     // loginout,
//    // switchUploadModal
//   }
// )(withRouter(AdminHeader))


export default connect(
  ({ init, user})=>({ user })
)(withRouter(AdminHeader))