
import React, { Component, useState } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';

import { translateMarkdown } from '../../utils';
import moment from 'moment';
import AppAvatar from '../../components/Avatar';
import { Comment, Button, Tooltip, Input, Icon, Popconfirm, mesage, message } from 'antd';
import { identical } from 'ramda';
const { TextArea } = Input;


function CommentItem(props) {
  const { children, item, userInfo, articleId, commentId, replyId, replyVisible } = props
  const { user } = item
  const [value, setValue] = useState('')

  function handleChange(e) {
    setValue(e.target.value)
  }

  function handleKeyUp(e) {
    if (e.ctrlKey && e.keyCode === 13) {
      onSubmit()
    }
  }
  function onSubmit() {
    if (!userInfo.userId) return message.warn('您未登录，请登录后再试');
    const params = {
      userId: userInfo.userId,
      articleId,
      content: value.trim(),
      commentId
    }
    props.onSubmit(params);

  }

  function onDelete() {
    if (replyId) {
      props.onDelete({ id: replyId, type: 'reply', commentId });
    } else {
      props.onDelete({ id: commentId , type: 'comment', commentId })
    }
  }

  function handleReply() {
    props.onReply({ commentId, replyId});
  }

  return (
    <Comment
      actions={
        [
          <span onClick={handleReply}>Reply to</span>,
          <>
          {
            userInfo.role === 1 && (
              <Popconfirm
                title={'是否删除该留言? '}
                cancelText='取消'
                okText='确认'
                onConfirm={onDelete}
              >
                <Icon type='delete' className='icon-delete' />
              </Popconfirm>
            )
          }
          </>
        ]
      }
    author={<span>{ user && user.username }</span>}
    avatar={<AppAvatar userInfo={user} />}
    content={
      <div className='article-detail' dangerouslySetInnerHTML={{__html: translateMarkdown(item.content, true)}} />
    }
    datetime={
      <Tooltip title={item.createdAt}>
        <span>{ moment(item.createdAt).fromNow()}</span>
      </Tooltip>
    }
  >
    {
      replyVisible && (
        <div className='reply-form'>
          <TextArea
            placeholder={`回复${item.user.username}...`}
            value={value}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
          <div className='reply-form-controls'>
            <span className='tip'>Ctrl or ⌘ + Enter</span>
            <Button htmlType='submit' type='primary' disabled={!value.trim()} onClick={onSubmit}>
              回复
            </Button>
          </div>
        </div>
      )
    }
    { children }
  </Comment>
  )
}


@connect(({ user, init, discuss })=> ({ user, init, discuss }))
class CommentList extends Component{
  static propTypes = {
    commentList: PropTypes.array,
    articleId: PropTypes.number,
    setCommentList: PropTypes.func
  }

  state = {
    replyTarget: {
      commentId: 0,
      replyId: 0
    }
  }

  setReplyTarget = replyTarget => {
    this.setState({ replyTarget });
  }

  onSubmit(params) {
    this.props.dispatch({
      type: 'discuss/addDiscuss',
      payload: { ...params },
      callback: res => {
        console.log("callback res", res);
        message.success("评论成功");
        const { code, data } = res;
        this.setReplyTarget({ commentId: 0, replyId: 0 });
        this.props.setCommentList(data && data.rows);
      }
    })
  }

  onDelete({id = null, type, commentId}) {
    if (type === 'reply') {
      this.props.dispatch({
        type: 'discuss/deleteReply',
        payload: id,
        callback: (res ) => {
          const { code } = res;
          if (code === 200) {
            const commentList = [ ...this.props.commentList ];
            const targetComment = commentList.find(c => c.id === commentId );
            targetComment.replies = targetComment.replies.filter(r => r.id !== id);
            this.props.setCommentList(commentList);
            message.success('删除回复成功');
          } else {
            message.error('删除失败')
          }
        }
      })
    } else if (type === 'comment') {
      this.props.dispatch({
        type: 'discuss/deleteComment',
        payload: id,
        callback: (res) => {
          if (res.code === 200) {
            let commentList = [ ...this.props.commentList];
            commentList = commentList.filter(c => c.id !== id);
            this.props.setCommentList(commentList);
            message.success('删除评论成功')
          } else {
            message.error('删除失败');
          }
        }
      })
    }
  }

  render () {
    const { commentList, userInfo, articleId, setCommentList } = this.props;
    const { replyTarget } = this.state;

    return (
      <div className='discuss-list'>
        {
          commentList && commentList.map(comment => (
            <CommentItem
              item={comment}
              key={comment.id}
              articleId={articleId}
              userInfo={userInfo}
              commentId={comment.id}
              setCommentList={ setCommentList }
              commentList={commentList}
              onReply={this.setReplyTarget}
              onSubmit={ (params) => this.onSubmit(params)}
              onDelete={ (params) => this.onDelete(params)}
              replyVisible={replyTarget.commentId === comment.id && !replyTarget.replyId}
            >
              {
                comment.replies && comment.replies.map(reply => (
                  <CommentItem
                    item={reply}
                    key={reply.id}
                    articleId={articleId}
                    userInfo={userInfo}
                    commentId={comment.id}
                    replyId={reply.id}
                    setCommentList={ setCommentList }
                    commentList={commentList}
                    onReply={this.setReplyTarget}
                    onSubmit={ (params) => this.onSubmit(params)}
                    onDelete={ (params) => this.onDelete(params)}
                    replyVisible={replyTarget.commentId === comment.id && replyTarget.replyId === reply.id}
                  />
                ))
              }
            </CommentItem>
          ))
        }
      </div>
    )
  }

}

export default CommentList;