import React, { Component } from 'react'
import {Row,Col} from 'antd';
import styles from './style.less';
import Logo from './logo.js';
import Search from './search.js';
import Nav from './nav.js';
import UserHead from './userHead.js'
export default class Header extends Component {
    render() {
        return (
            <Row type="flex" align='middle' justify="center" className={styles.headerContainer}>
            <Col span={4} >
                <Logo />
            </Col>
            <Col span={4}>
                <Search />
            </Col>
            <Col span={12}>
                <Nav />
            </Col>
            <Col span={4}>
                <UserHead />
            </Col>
        </Row>
        )
    }
}
