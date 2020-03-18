import React,{Component,useState,useEffect} from 'react'
import {connect} from 'dva'
import {withRouter} from 'dva/router'
import mock from 'mockjs'
import { Modal, Input, Icon, Message, Button, Form, Alert, Checkbox } from 'antd'
import {GITHUB} from '../../config'

import { save, remove } from '../../utils/storage'
import FormBuilder from '../FormBuilder'
import {encrypt} from '../../utils/aesutil'


function SignModal(props){
  const {type,visible,onCancel} =props
  
  
 
  useEffect(() => {
    // console.log(props.visible, 'componentDidMount and componentDidUpdate')
    props.visible && props.form.resetFields()
    /*eslint react-hooks/exhaustive-deps: "off"*/
  }, [props.visible])

  //确认密码
  function compareToFirstPassword(rule, value, callback) {
    const form = props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  function validateUsername(rule,value,callback){
     
    props.dispatch({
      type:'user/findByUsername',
      payload:{username:value},
      callback:(res)=>{
        if(res.message!=='SUCCESS'){
          Message.error('用户名已被注册');
      }
      }
    })
  
    
    callback();
}

function validateEmail(rule,value,callback){
     
  props.dispatch({
    type:'user/findUserByEmail',
    payload:{email:value},
    callback:(res)=>{
      if(res.message!=='SUCCESS'){
        Message.error('邮箱已被注册');
    }
    }
  })
  callback();

}
  
  

  //生成表单
  const getMeta= type => {
    let elements=[]
    if(type==='login'){
      elements=[
        {
          key:'email',
          label:'邮箱',
          widget:<Input placeholder="请输入邮箱" />,
          rules:[
            { required: true, message: 'email is required' }
          ],
          validateTrigger:'onBlur'
        },
        {
          key: 'password',
          label: '密码',
          widget: <Input placeholder='请输入密码' type='password' />,
          rules: [{ required: true, message: 'Password is required' }],
          validateTrigger:'onBlur'
        }
      ]
    } else if(type==='register'){
      elements = [
        {
          key: 'userid',
          
          widget: <Input placeholder='请输入用户编号' type="hidden"/>,
          rules: [{ required: true, message: 'Userid is required' }],
          validateTrigger:'onBlur',
          initialValue:'1'+ mock.Random.string("number",7),
        },
        {
          key: 'username',
          label: '用户名',
          widget: <Input placeholder='请输入用户名' />,
          rules: [{ required: true, message: 'Username is required' }, 
          { validator: validateUsername }
        ],
          validateTrigger:'onBlur'
        },
        {
          key: 'password',
          label: '密码',
          widget: <Input placeholder='请输入密码' type='password' />,
          rules: [{ required: true, message: 'Password is required' }],
          validateTrigger:'onBlur'
        },
        {
          key: 'confirm',
          label: '确认密码',
          widget: <Input placeholder='确认密码' type='password' />,
          rules: [{ required: true, message: 'Please confirm your password!' }, { validator: compareToFirstPassword }],
          validateTrigger:'onBlur'
        },
        {
          key: 'email',
          label: '邮箱',
          widget: <Input placeholder='请输入您的邮箱' />,
          rules: [
            { type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your E-mail!' },
            { validator: validateEmail }
          ],
          validateTrigger:'onBlur'
        }
      ]
    }

    const meta={
      formItemLayout: {
        colon: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 }
        }
      },
      elements
    }

    return meta
  }


  function handleSubmit(e){
    
    e.preventDefault()
    console.log(e)
    props.form.validateFields((errors, values) => {
      
      if (errors) {
       
        return
      }
     
      if (type === 'login') {
        props.dispatch({
          type:'user/login',
          payload:{
            ...values,
            // password: encrypt(values.password)
          },
          callback:(res)=>{
           
            if(res.message==='SUCCESS'){
              const user=res.data;
             
                // localStorage.setItem('user',JSON.stringify(user));
                // localStorage.setItem('token',JSON.stringify(res.data.token));
                    Message.success('登录成功')  
                }
            else{
                if(res.message==='err')
                    Message.error("密码错误，请重试");
                else if(res.message==='unregister'){
                    Message.error("您还未注册，请先注册");
                    
                }
            }

          }

        }).then(props.succeedCallBack)
      } else if (type === 'register'){
        props.dispatch({
          type:'user/createUser',
          payload:{
              ...values,
              password:encrypt(values.password)
          },
          callback:(res)=>{
            Message.success("注册成功")
          }
        }).then(props.succeedCallBack)
      }
    })
  }

  function githubLogin() {
    const { pathname, search } = props.location
    save('prevRouter', `${pathname}${search}`)
    window.location.href = `${GITHUB.url}?client_id=${GITHUB.client_id}`
  }

  return (
    <Modal width={460} title={type} visible={visible} onCancel={onCancel}
     footer={null}>
      <Form layout='horizontal'>
        <FormBuilder meta={getMeta(type)} form={props.form} />
        <Button type='primary' block htmlType='submit' onClick={handleSubmit}>
          {type}
        </Button>
        {GITHUB.enable && (
          <Button block htmlType='submit' icon='github' onClick={githubLogin} style={{ marginTop: 10 }}>
            github login
          </Button>
        )}
      </Form>
    </Modal>
  )

}


export default connect(({init,user})=>({user,init}))(Form.create()(withRouter(SignModal)))
