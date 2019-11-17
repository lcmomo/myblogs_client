import React, { Component } from 'react'
import {Link} from 'dva/router'
import styles from './style.less'
export default class Logo extends Component {
    render() {
        return (
            <Link to="/" style={{textDecoration:'none'}}>
            <div className={styles.logo}><span >夙兮执梦</span>
                
            </div>
            </Link>
            
        )
    }
}
