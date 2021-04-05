import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'
import { connect } from 'dva'

//methonds
import { Comment, Form, Button, Divider, Input, Icon, Menu, Dropdown, message } from 'antd'
import AppAvatar from '../Avatar';
import { calcCommentsCount } from '../../utils';
import List from './list';


const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, submitting, value, articleId }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} placeholder='说点啥吧...' onChange={ onChange } value={ value }></TextArea>
    </Form.Item>
    <Form.Item>
      <div className="controls">
        <Icon type="info-circle" className="controls-tip-icon" />
        <span className="controls-tip">支持Markdown语法</span>
        <Button className="discuss-btn" htmlType="submit" loading={ submitting } onClick={ onSubmit } type="primary">
          { articleId !== -1 ? '添加评论' : '留言' }
        </Button>
      </div>
    </Form.Item>
  </div>
)

class Discuss extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      submitting: false
    }
  }

    handleMenuClick(e) {
      switch (e.key) {
        case 'login':
          this.props.dispatch({ type: 'init/switchSignModal', payload: { type: 'login', visible: true } })
          break;
        case 'register':
          this.props.dispatch({ type: 'init/switchSignModal', payload: { type: 'register', visible: true } })
          break;
        case 'logout': 
          this.props.dispatch({ type: 'user/logout'});
          break;
        default:
          break;
        }
    }

    handleSubmit() {
      const { articleId, user } = this.props;
      const { username, userId } = user;
      const { value } = this.state;
      if (!this.state.value) return;
      if (!username) return message.warn('您未登录，请请登录后再试');
      // this.setState({ submitting: true });
      this.props.dispatch({
        type: 'discuss/addDiscuss',
        payload: {
          articleId,
          content: value,
          userId
        },
        callback: (res) => {
          if (res.code === 200) {
            const { data } = res;
            this.setState({ submitting: false, value: '' });
            this.props.setCommentList(data && data.rows)
            console.log("add discuss res", res)
            message.success("评论成功");
          } else {
            this.setState({ submitting: false })
          }
        }
      })
    }
    render() {
      const { commentList, articleId, user, setCommentList } = this.props;
      const { username, role } = user;
      const { submitting, value } = this.state;
      const renderDropdownMenu = (username) => {
        return  username ? (
          <Menu onClick={ (e) => this.handleMenuClick(e) }>
            <Menu.Item key='logout'>注销</Menu.Item>
          </Menu>
        ) : (
          <Menu onClick={ (e) => this.handleMenuClick(e) }>
            <Menu.Item key="login">登录</Menu.Item>
            <Menu.Item key="register">注册</Menu.Item>
          </Menu>
        )
      }
      return (
        <div id="discuss">
          <div className="discuss-header">
            <span className="discuss-count">{ calcCommentsCount(commentList)} </span>
            { articleId !== -1 ? '条评论' : '条留言'}
            <span className='discuss-user'>
              <Dropdown overlay={ renderDropdownMenu(username) } trigger={['click', 'hover']}>
                <span>
                  { username || '未登录用户'} <Icon type='down' />
                </span>
              </Dropdown>
            </span>
            <Divider className='hr' />
          </div>
          <Comment
            avatar={
              username ? (
                <AppAvatar userInfo={ { ...user } } />
              ) : (
                <Icon type='github' theme='filled' style={{ fontSize: 40, margin: '5px 5px 0 0' }} />
              )
            }
            content={
              <Editor
                onChange={ e => this.setState({ value: e.target.value }) }
                onSubmit={ e => this.handleSubmit(e)}
                submitting={ submitting }
                value = { value }
                articleId = { parseInt(articleId) }
              />
            }
          />
          <List commentList={commentList} articleId={parseInt(articleId)} setCommentList={res => {
            console.log("discuss index res: ", res)
            setCommentList(res)
          }
            } userInfo={ { ...user } } />
        </div>
      )
    }
}

Discuss.propTypes = {
  commentList: PropTypes.array.isRequired
}

export default connect(({ user, init, discuss, article })=> ({ user, init, discuss, article }))(Discuss)
