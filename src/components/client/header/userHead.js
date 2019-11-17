import React, { Component,Fragment } from 'react';
import { Menu,Dropdown,Avatar,Icon } from 'antd';
import { connect } from 'dva';
import myAvatar from '../../../assets/img/myavator.png';
import LoginModal from '../loginModal/LoginModel.js';
import RegisterModal from '../registerModel/RegisterModel.js';
import UpdateUserModal from '../updateUserModal/UpdateUserMolde.js';

@connect(({example,user})=>({example,user}))
export default class userHead extends Component {


    constructor(props) {
        super(props)
        this.state = {
            loginShow: false,
            registerShow: false,
            updateUserInfoShow: false
        }
    }

    changeLoginModalShow = () => {
        this.setState((state) => ({
            loginShow: !state.loginShow
        }))
    }
    changeRegisterModalShow = () => {
        this.setState((state) => ({
            registerShow: !state.registerShow
        }))
    }
    changeUpdateUserInfoModalShow = () => {
        this.setState((state) => ({
            updateUserInfoShow: !state.updateUserInfoShow
        }))
    }
    logout = () => {
       
    }
    userMenu = () => (
        <Menu>
            <Menu.Item onClick={this.changeUpdateUserInfoModalShow}>
                修改用户信息
            </Menu.Item>
            <Menu.Item onClick={this.logout}>
                退出登录
            </Menu.Item>
        </Menu>
    )
    loginRegisterMenu = () => (
        <Menu>
            <Menu.Item onClick={this.changeLoginModalShow}>
                用户登录
            </Menu.Item>
            <Menu.Item onClick={this.changeRegisterModalShow}>
                用户注册
            </Menu.Item>
        </Menu>
    )
    render() {

        let { loginShow, registerShow, updateUserInfoShow } = this.state;
       // let { userId, token, name, auth, categoryColors } = this.props;
         let {userInfo:{user,token,auth}} =this.props.user;
        // const {token,user }=userInfo;
       
        console.log(this.props.user)
        return (
            <div className='userHead'>
                {token ?
         
                <Fragment>
                    <Dropdown overlay={this.userMenu} trigger={['hover', 'click']}>
                      {
                          auth ?
                             <Avatar size={43} src={ myAvatar} style={{ marginLeft: '40px' }} /> 
                                :
                             <Avatar size={43} style={{  marginLeft: '40px' }} >
                                {'默默'}
                            </Avatar>
                      } 
                    </Dropdown>
                    {updateUserInfoShow && <UpdateUserModal isShow={updateUserInfoShow} onCancel={this.changeUpdateUserInfoModalShow} />}
                </Fragment>
               :
                <Fragment>
                    <Dropdown overlay={this.loginRegisterMenu} trigger={['hover', 'click']}>
                        <Avatar size={43} style={{ marginLeft: '40px' }} >
                            <Icon type="user" />
                        </Avatar>
                    </Dropdown>
                    {loginShow && <LoginModal isShow={loginShow} onCancel={this.changeLoginModalShow} />}
                    {registerShow && <RegisterModal isShow={registerShow} onCancel={this.changeRegisterModalShow} />}
                </Fragment> 
            }
        </div >
        )
    }
}
