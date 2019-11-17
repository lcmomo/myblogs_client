import React, { Component } from 'react'
import {Route,Switch} from 'dva/router'
import { Row,Col,Spin,BackTop } from 'antd'
import Header from '../components/client/header/index.js';
import Slider from '../components/client/slider/index.js'
export default class client extends Component {
    render() {
        return (
            <div className='web-root'>
                <Header />
                <Row>
                    <Col span={4} className='slider-box'>
                      <Slider />
                    </Col>
                </Row>
            </div>
        )
    }
}
