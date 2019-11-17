import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'dva/router';
import style from './style.less'


 class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentKey: '/',
            navData: [
                {
                    key: '/',
                    pathname: '/',
                    name: '首页',
                    icon: 'home'
                },
                {
                    key: '/articles',
                    pathname: '/articles',
                    name: '文章',
                    icon: 'edit'
                },
                {
                    key: '/thoughts',
                    pathname: '/thoughts',
                    name: '说说',
                    icon: 'bars'
                },
                {
                    key: '/chats',
                    pathname: '/chats',
                    name: '聊天',
                    icon: 'user'
                },
                {
                    key: '/bbs',
                    pathname: '/bbs',
                    name: '留言',
                    icon: 'user'
                },
                {
                    key: '/music',
                    pathname: '/music',
                    name: '音乐',
                    icon: 'user'
                },
                {
                    key: '/movies',
                    pathname: '/movies',
                    name: '电影',
                    icon: 'user'
                },
                {
                    key: '/books',
                    pathname: '/books',
                    name: '书籍',
                    icon: 'user'
                },

            ]
        }
    }

    changeSelectNav = ({ key }) => {
        this.setState(() => ({
            currentKey: key
        }))
    }

    changeSelectNavHandle(pathname) {
        let { navData } = this.state
        let include = navData.find((item) => item.pathname === pathname)
        if (!include) {
            this.changeSelectNav({ key: '' })
        } else {
            this.changeSelectNav({ key: pathname })
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        let { pathname } = nextProps.location
        this.changeSelectNavHandle(pathname)
    }
    UNSAFE_componentWillMount() {
        let { pathname } = this.props.location
        this.changeSelectNavHandle(pathname)
    }

    render() {
        let { currentKey, navData } = this.state;
        return (
           <div className={style.nav}>
                <Menu mode="horizontal"
                    className={style.navUl}
                  
                    overflowedIndicator={<Icon type="menu" />}
                >
                    {navData.map((nav, key) => (
                        <Menu.Item key={nav.key} className={style.item}>
                            <Link to={nav.pathname}>
                                <Icon type={nav.icon} />
                                {nav.name}
                            </Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </div >
        )
    }
}

export default withRouter(Nav);