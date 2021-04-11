import React, { useState, useEffect } from 'react'
import { Table, Tag, Switch, Popconfirm, Icon , Message } from 'antd';
import { connect } from 'dva';

import moment from 'moment';
import FilterForm from './filterForm';
import AppPagination from '../../../components/Pagination';

function AdminUser(props) {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 1,
    total: 0
  });
  const [query, setQuery] = useState({});
  const [switchId, setSwitchId] = useState(0);

  useEffect(() => {
    fetchList({ current: 1});
  }, []);

  function fetchList({ current = 1, pageSize = 10, ...query}) {
    const params = { pageNo: current, pageSize, ...query };
    setLoading(true);
    props.dispatch({
      type: 'user/fetchUserList',
      payload: params,
      callback: (res) => {
        console.log("user: ", res);
        const { code, data, message } = res;
        if (code === 200) {
          setList(data.rows);
          setPagination({
            current,
            pageSize,
            total: data.count
          })
          setLoading(false);
        } else {
          Message.error(message);
          setLoading(false);
        }
      }
    })
  }

  function onQuery(values) {
    setQuery(query)
    fetchList({ ...values, current: 1 });
  }

  function onDelete(userId) {
    props.dispatch({
      type: 'user/deleteUser',
      payload: userId,
      callback: (res => {
        if (res.code === 200) {
          Message.success('删除成功');
          fetchList(pagination);
        } else {
          Message.error(res.message);
        }
      })
    })
  }
  function handlePageChange(page) {
    pagination.current = page
    setPagination(pagination)
    fetchList({ ...pagination, ...query })
  }

  function switchNotice (checked, userId) {
    setSwitchId(userId);
    props.dispatch({
      type: 'user/updateUser',
      payload: {
        notice: checked,
        userId
      },
      callback: (res) => {
        if (res.code === 200) {
          const target = list.find(l => l.id === userId)
          target.notice = checked
          setList(list);
          setSwitchId(0);
          Message.success('操作成功');
        }
        else {
          setSwitchId(0);
          Message.error(res.message);
        }
      }
    });
  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '邮件通知',
      dataIndex: 'notice',
      render: (text, record) => (
        <Switch
          defaultChecked={text}
          onChange={checked => switchNotice(checked, record.id)}
          loading={ switchId === record.id}
        />
      )
    },
    {
      title: '用户类型',
      dataIndex: 'type',
      render: (text, record) => {
        return record.github ? <Tag color='#1890ff'>github 用户</Tag> : <Tag color='magenta'>站内用户</Tag>
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      sorter: (a, b) => (moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1)
    },
    {
      title: '操作',
      render: (text, record) => (
        <Popconfirm
          title='确定进行该项操作吗'
          icon={<Icon type='question-circle-o' style={{ color: 'red'}} />}
          onConfirm={e => onDelete(record.id)}
         >
           <span className='delete-text'>删除</span>
         </Popconfirm>
      )
    }
  ]
  return (
    <div>
     <FilterForm onQuery={onQuery} />
     <Table rowKey='id' bordered loading={loading} columns={columns} dataSource={list} pagination={false} scroll={{ x: 1200}} />
     <AppPagination {...pagination} onChange={handlePageChange} />
    </div>
  )
}

export default connect(({ user }) =>({ user }))(AdminUser);