import React, { Component,useState } from 'react'
import { connect } from 'dva'
import { withRouter } from 'dva/router'

import { Button, Dropdown, Menu, Avatar } from 'antd'


import SignModal from '../../../../components/SignModal'
import AppAvatar from '../../../../components/Avatar'

// function UserInfo(props){
//   const [type, visible] = useState('')
 
//   const {username,github,role } =props.user.userInfo
//   let {signModal}=props.init;
//   console.log(signModal.visible)
//   const MenuOverLay=(
//     <Menu>
//       {role === 1 && (
//         <Menu.Item>
//           <span onClick={e => console.log("导入文章")}>导入文章</span>
//         </Menu.Item>
//       )}
//       {role === 1 && (
//         <Menu.Item>
//           <span onClick={e => props.history.push('/admin')}>后台管理</span>
//         </Menu.Item>
//       )}
//       <Menu.Item>
//         <span className='user-logout' onClick={()=>console.log("logout")}>
//           退出登录
//         </span>
//       </Menu.Item>
//     </Menu>
//   )

  

//   return (
//     <div className='header-userInfo'>
//     {username ? (
//       <Dropdown placement='bottomCenter' overlay={MenuOverLay} trigger={['click', 'hover']}>
//         <div style={{ height: 55 }}>
//           <AppAvatar userInfo={props.userInfo} popoverVisible={false} />
//         </div>
//       </Dropdown>
//     ) : (
//       <>
//         <Button
//           ghost
//           type='primary'
//           size='small'
//           style={{ marginRight: 20 }}
//           onClick={e => this.setState({type:'login',visible:true})
//           }>
//           登录
//         </Button>
//         <Button ghost type='danger' size='small' onClick={e => console.log("register")}>
//           注册
//         </Button>
//       </>
//     )}
//     <SignModal visible={signModal.visible} />
//     {/* <UploadModal />
//     <ResultModal /> */}
//   </div>
//   )
// }



class UserInfo extends Component{
  constructor(props){
    super(props)
    this.state={
      SignModalShow:false,
      UploadModalShow:false,
      ResultModalSHow:false,
      type:''
    }
  }

  ShowLoginModal=(type)=>{
    this.setState((state)=>({
      type:'login',
      SignModalShow:true
    }))
  }
  ShowRegisterModal=(type)=>{
    this.setState((state)=>({
      type:'register',
      SignModalShow:true
    }))
  }

 HiddenSignModal=()=>{
    this.setState((state)=>({
     
      SignModalShow:false
    }))
  }

  render(){
  const {userInfo,username,github,role}=this.props.user
  //const {username,github,role } =this.props.userInfo
  const {SignModalShow,UploadModalShow,ResultModalSHow}=this.state
 

  const MenuOverLay=(
    <Menu>
      {role === "1" && (
        <Menu.Item>
          <span onClick={e => console.log("导入文章")}>导入文章</span>
        </Menu.Item>
      )}
      {role === "1" && (
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
    <div className='header-userInfo'>
    {username ? (
      <Dropdown placement='bottomCenter' overlay={MenuOverLay} trigger={['click', 'hover']}>
        <div style={{ height: 55 }}>
          <AppAvatar userInfo={userInfo} popoverVisible={false} />
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
            this.ShowLoginModal
          }>
          登录
        </Button>
        <Button ghost type='danger' size='small' onClick={this.ShowRegisterModal}>
          注册
        </Button>
      </>
    )}
   {  SignModalShow&&<SignModal visible={SignModalShow} onCancel={this.HiddenSignModal} type={this.state.type} succeedCallBack={this.HiddenSignModal} /> }
    {/* <UploadModal />
    <ResultModal /> */}
  </div>
  )
  }

  
}
export default connect(
  ({user,init})=>({user,init})
)(withRouter(UserInfo))
