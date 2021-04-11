import React, { useEffect, useState } from 'react'
import { connect } from 'dva';
import { Button, Input, Modal, BackTop, message } from 'antd'
import MdEditor from '../../../../components/MdEditor';
import List from './Tag';
import { pathParams } from '../../../../utils'

 function Edit(props) {
  const [content, setContent] = useState('');
  const [title, setTitle ] = useState('');
  const [tagList, setTagList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [tagSelectedList, setTagSelectedList] = useState([]);
  const [cateSelectedList, setCateSelectedList] = useState([]);


  
  const editId = getEditId();
  
  useEffect(() => {
    if (editId) {
      fetchArticle(editId);
    }
  }, [props.match.params]);

  useEffect(() => {
    if (!editId) {
      fetchTags()
    }
  }, []);

  function getEditId () {
    const { location: { pathname } } = props;
    const routeParam = pathParams('/admin/article/edit/:id', pathname);
    return routeParam && routeParam[1] ? routeParam[1] : ''
  }

  function fetchTags () {
    props.dispatch({
      type: 'tag/fetchTagList',
      callback: res => {
        console.log('tag: ',res)
        const tags = res.tagList.map(d => d.name).slice(0, 10);
        const cates = res.tagList.map(d => d.name).slice(0, 10);
        setTagList(tags);
        setCategoryList(cates);
        tags[0] && setTagSelectedList([tags[0]]);
        cates[0] && setCateSelectedList([cates[0]]);

      }
    })

  }
  function fetchArticle(id) {
    props.dispatch({
      type: 'article/fetchArticleDetail',
      payload: id,
      callback: res => {
        setTitle(res.title);
        setContent(res.content);
        const tags = res.tags.map(d => d.name);
        const categories = res.categories.map(d => d.name);
        setTagList(tags);
        setCategoryList(categories);
        setTagSelectedList(tags);
        setCateSelectedList(categories);
      }
    })
  }

  function add() {
    if (!title) return message.warning('标题不能为空！');
    props.dispatch({
      type: 'article/createArticle',
      payload: {
        title,
        content,
        tagList: tagSelectedList,
        categoryList: cateSelectedList,
        authorId: props.user.userId
      },
      callback: res => {
        const { code, data } = res;
        console.log("create rs", res)
        if (code === 200) {
          Modal.confirm({
            title: '文章创建成功，是否查看？',
            onOk: () => props.history.push(`/web/article/${data.id}`)
          })
        } else {
          message.error('创建失败！')
        }
      }
    })
  }

  function update() {
    console.log("tags: ", tagSelectedList)
    props.dispatch({
      type: 'article/updateArticle',
      payload: {
        editId,
        title,
        content,
        tags: tagSelectedList,
        categories: cateSelectedList,
      },
      callback: res => {
        if (res.code === 200) {
         message.success('更新成功');
         Modal.confirm({
          title: '文章更新成功，是否查看？',
          onOk: () => props.history.push(`/web/article/${editId}`)
        })
        } else {
          message.error('更新失败！')
        }
      }
    })
  }
  return (
    <div className='admin-edit-article'>
      <ul className='form-list'>
        <li>
          <span className='label'>标题：</span>
          <span style={{flex: 1}}>
            <Input
              placeholder='请输入文章标题'
              className='title-input'
              name='title'
              value={title}
              onChange={ e => setTitle(e.target.value)}
            />
          </span>
        </li>
        <li>
          <span className='label'>标签：</span>
          <span>
            <List
             list={tagList}
             setList={setTagList}
             selectedList={tagSelectedList}
             setSelectedList={setTagSelectedList}
            />
          </span>
        </li>
        <li>
          <span className='label'>分类：</span>
          <span>
            <List
              list={categoryList}
              setList={setCategoryList}
              selectedList={cateSelectedList}
              setSelectedList={setCateSelectedList}
            />
          </span>
        </li>
      </ul>
      <MdEditor value={content} onChange={setContent} />
      <Button
        type='primary'
        shape='circle'
        size='large'
        disabled={!title}
        className='action-icon'
        title={editId ? '更新': '新增'}
        icon={editId ? 'sync' : 'plus'}
        onClick={ () => {
          editId ? update() : add()
        }}
      />
      <BackTop target={() => document.querySelector('.admin-main')} />
    </div>
  )
}

export default connect(({article, tag, user }) => ({ article, tag, user }))(Edit)