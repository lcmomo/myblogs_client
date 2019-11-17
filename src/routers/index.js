import React, { Component,Fragment } from 'react';
import {withRouter,Route} from 'dva/router';
import {connect} from 'dva';
import Client from './client.js';
import Admin from './admin.js';
import AdminLogin from '../pages/admin/adminLogin.js'
import example from '../models/example.js';
class Main extends Component {

    checkAuth(){
        let {history,auth}=this.props;
        let {pathname}=this.props.location;
        console.log(pathname)
        if( !auth&& pathname!=='/admin/login' && pathname.indexOf('/admin')!== -1){
            history.push('/admin/login');
        }
    }

    UNSAFE_componentWillMount() {
        this.checkAuth()
    }
    UNSAFE_componentWillReceiveProps() {
        this.checkAuth()
    }
    render() {
        let {pathname }=this.props.location;
        let isAdminPath=false;
        let isAdminLoginPath =false;
        if(pathname.indexOf('/admin') !== -1){
            isAdminPath=true;
            if (pathname === '/admin/login') {
                isAdminLoginPath = true
            }
        }
        return (
            <Fragment>
            {isAdminPath ?
                    isAdminLoginPath ?
                        <Route path='/admin/login' component={AdminLogin} />
                        : <Admin />
                    : <Client />}
            </Fragment>
        )
    }
}

export default withRouter(connect(
    ({user})=>({auth:user.userInfo.auth})
    )(Main));