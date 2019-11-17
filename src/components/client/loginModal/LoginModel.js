import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import {Link} from 'dva/router'
import LoginForm from '../../common/loginForm/LoginForm.js';
import Request from '../../../utils/request.js';
import styles from './Login.scss';


//@connect(({global})=>({userInfo:global.userInfo}))
 class LoginModel extends Component {
    render() {
      
        let {isShow,onCancel}=this.props;
        return (
            <Modal
                title="登录"
                visible={isShow}
                onCancel={onCancel}
                width={334}
                footer={null}
            >
                <LoginForm succeedCallback={onCancel} />

            </Modal>
       
        )
      
    }
}

export default LoginModel;