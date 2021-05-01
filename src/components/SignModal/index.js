import React, { useEffect } from 'react'
import {connect} from 'dva'
import {withRouter} from 'dva/router'
import mock from 'mockjs'
import { Modal, Input, Message, Button, Form } from 'antd'
import {GITHUB} from '../../config'

import { save, remove } from '../../utils/storage'
import FormBuilder from '../FormBuilder'
import { encrypt } from '../../utils/aesutil'


function SignModal(props){
  console.log("sign props: ", props)
  // const {type, onCancel, visible } = props;
  const { signModal: { type, visible }} = props.init;
  // const [visible, setVisible] = useState(props.visible)
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
          key:'account',
          label:'用户名',
          widget:<Input placeholder="请输入用户名或邮箱" />,
          rules:[
            { required: true, message: '请输入用户名' }
          ],
          validateTrigger:'onBlur'
        },
        {
          key: 'password',
          label: '密码',
          widget: <Input placeholder='请输入密码' type='password' />,
          rules: [{ required: true, message: '请输入密码' }],
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
          rules: [{ required: true, message: '请输入用户名' }, 
          // { validator: validateUsername }
        ],
          validateTrigger:'onBlur'
        },
        {
          key: 'password',
          label: '密码',
          widget: <Input placeholder='请输入密码' type='password' />,
          rules: [{ required: true, message: '请输入密码' }],
          validateTrigger:'onBlur'
        },
        {
          key: 'confirm',
          label: '确认密码',
          widget: <Input placeholder='确认密码' type='password' />,
          rules: [{ required: true, message: '确认密码' }, { validator: compareToFirstPassword }],
          validateTrigger:'onBlur'
        },
        {
          key: 'email',
          label: '邮箱',
          widget: <Input placeholder='请输入您的邮箱' />,
          rules: [
            { type: 'email', message: '邮箱格式不符合要求' },
            { required: true, message: '请输入邮箱' },
            // { validator: validateEmail }
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
    // console.log(e)
    props.form.validateFields( async (errors, values) => {

      if (errors) {
       console.log('errors: ', errors);
        return
      }
      if (type === 'login') {
        props.dispatch({
          type:'user/login',
          payload:{
            ...values,
            password: encrypt(values.password)
          },
          callback: (res)=>{
            // console.log("res: ", res)
            if(res.code === 200){
              const user=res.data;
                // localStorage.setItem('user',JSON.stringify(user));
                // localStorage.setItem('token',JSON.stringify(res.data.token));
              Message.success(res.message);
              props.dispatch({ type: 'init/switchSignModal', payload: { visible: false }})
            } else {
                Message.error(res.message);
            }
          }
        })
      } else if (type === 'register'){
        props.dispatch({
          type:'user/register',
          payload:{
              ...values,
              password: await encrypt(values.password)
          },
          callback:(res)=>{
            if (res.code === 200) {
              Message.success("注册成功");
              props.dispatch({ type: 'init/switchSignModal', payload: { visible: false }})
            } else {
              Message.error(res.message);
            }
          }
        });
      }
    })
  }

  function githubLogin() {
    const { pathname, search } = props.location
    save('prevRouter', `${pathname}${search}`)
    window.location.href = `${GITHUB.url}?client_id=${GITHUB.client_id}`
  }

  return (
    <Modal width={460} title={type === 'login' ? '登录' : '注册'} visible={visible}
     footer={ null } maskClosable
    //  onCancel = {()=> props.onCancel()}
    onCancel = {e => props.dispatch({ type: 'init/switchSignModal', payload: { visible: false }})}
     >
      <Form layout='horizontal'>
        <FormBuilder meta={getMeta(type)} form={props.form} />
        <Button type='primary' block  onClick={handleSubmit}>
          {type === 'login' ? '登录' : '注册'}
        </Button>
        {GITHUB.enable && (
          <Button block htmlType='submit' icon='github' onClick={githubLogin} style={{ marginTop: 10 }}>
            github 登录
          </Button>
        )}
      </Form>
    </Modal>
  )

}


export default connect(({ init, user })=>({ user, init }))(Form.create()(withRouter(SignModal)))
