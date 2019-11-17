import React, { Component } from 'react';
import { Avatar, Row, Col, Icon } from 'antd';
import img from '../../../assets/img/myavator.png';
import styles from  './index.scss';
class BloggerInfor extends Component {
    render() {
        return (
            <div className={styles.bloggerInfor} >
                <Avatar size={110} src={img} />
                <h2 className={styles.name}>默墨</h2>
                <p className="introduction" >搬砖工</p>
                <Row>
                    <Col span={24}>
                        <a href='https://github.com/LinWeb' rel="noopener noreferrer" target='_blank' style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                            <Icon type="github" /> github
                        </a>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BloggerInfor;