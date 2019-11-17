
import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'dva'
import { withRouter } from 'dva/router';
import styles from './style.less'
export default class Search extends Component {
    render() {
        return (
            <div className={styles.search}>
                <Input.Search
                    placeholder="搜索文章"
                   
                   
                    style={{ width: '80%' }}
                />
        </div>
        )
    }
}
