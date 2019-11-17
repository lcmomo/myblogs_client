import React, { Component } from 'react';
import { Button, Form, Input, Icon,Message } from 'antd';
//import { login } from '@/store/user/action'
import { connect } from 'react-redux'
import Request from '../../../utils/request.js';
import {getItemEnv } from '../../../utils/index';
import { ITEM_NAME } from '../../../config/config.js';
const baseUrl=getItemEnv()==='development'?`http://localhost:8080`:`http://www.llchaoblogs.work:8080/myblogs-1.0`;
class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }
    handleSubmit = e => {
        e.preventDefault()
       
        const { validateFields } = this.props.form;
        validateFields((err, values) => {
            if (!err) {
                this.setState(() => ({
                    loading: true
                }))
                // dispatchLogin({ ...values, type }).then(data => {
                //     if (data) {
                //         if (data.status) {
                //             succeedCallback()
                //         }
                //     }
                //     this.setState(() => ({
                //         loading: false
                //     }))
                // })
                console.log(baseUrl);
                console.log(getItemEnv())
                Request(`${baseUrl}/user/login`,{
                    method:'POST',
                    body:{
                        ...values
                    }
                }).then((res)=>{

                    this.setState(() => ({
                        loading:false
                    }));
                   // const user=res.data.data;
                    const {token,user}=res.data.data;
                    console.log(res);
                    if(res.data.message==='SUCCESS'){
                        //localStorage.setItem('user',JSON.stringify(user));
                        sessionStorage.setItem('user',JSON.stringify(user));
                        sessionStorage.setItem('token',JSON.stringify(token));
                       
                        this.props.dispatch({
                            type:'user/setUserInfo',
                            payload:{
                                user:user,
                                auth:true,
                                token:token

                            }
                        }).then(()=>{
                            Message.success('登录成功');

                           this.props.succeedCallback();
                          
                           
                           
                          
                        })
                    }else{
                        if(res.data.message==='err')
                            Message.error("密码错误，请重试");
                        else if(res.data.message==='unregister'){
                            Message.error("您还未注册，请注册");
                           
                        }
                    }
    
    
                }).catch(err=>{
                    Message.error('系统错误');
                })
              
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let { loading } = this.state
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                required: true,
                                message: '请输入电子邮箱',
                            },
                        ],
                    })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入电子邮箱" />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ],
                    })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="请输入密码" />)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" loading={loading} htmlType="submit" style={{ width: '100%', float: 'right' }}>
                        登录
                       </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default connect(({user})=>({user}))(Form.create({ name: 'login-form' })(LoginForm))