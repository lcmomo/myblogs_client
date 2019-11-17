import React, { Component } from 'react'
import styles from './index.scss';
import BloggerInfor from './bloggerInfor.js';
import NewArticles from './newArticles.js';
import Tags from './tags';

 class Slider extends Component {

    render() {
        return (
            
                <div className={styles.siderContainer}>
                <div className='sider-roll'>
                    <BloggerInfor />
                    <NewArticles />
                    <Tags />
                </div>
            </div>
           
        )
    }
}
export default Slider;