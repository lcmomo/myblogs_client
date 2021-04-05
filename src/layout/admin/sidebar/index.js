import React from 'react'
import { NavLink, withRouter } from 'dva/router'
import { Menu, Icon } from 'antd'
import menu from './menu';
import { BG_AVATAR } from '../../../config'


const SubMenu = Menu.SubMenu

function getMenuOpenKeys(menu) {
  const list = [];
  menu.forEach(item => {
    if (item.children) {
      item.children.forEach(child => {
        list.push({
          pathname: child.path,
          openKey: item.path
        });
      });
    }
  });
  return list;
}

const menuOpenKeys = getMenuOpenKeys(menu);

function AdminSidebar(props) {

  // 菜单渲染
  function renderMenu(list) {
    const renderRoute = item => {
      if (item.hidden) return null;
      if (item.children) {
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
              </span>
            }>
            {item.children.map(r => renderRoute(r))}
          </SubMenu>
        )
      } else {
        return (
          item.name && (
            <Menu.Item key={item.path}>
              <NavLink to={item.path}>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
              </NavLink>
            </Menu.Item>
          )
        )
      }
    }
    return list.map(l => renderRoute(l))
  }

  const target = menuOpenKeys.find(d => d.pathname ===  props.selectedKeys[0]);
  const openKeys = target ? [target.openKey] : []

  return (
    <div className='sibar-container'>
      <div className='header-title'>
        <img src= { BG_AVATAR } alt='logo' style={{ width:30, height:30, margin: '0 5px', borderRadius: '50%' }} />
        { props.collapsed ? '': '后台管理' }
      </div>
      <Menu
        defaultOpenKeys={openKeys}
        // openKeys={openKeys}
        selectedKeys={props.selectedKeys}
        theme='dark'
        mode='inline'>
        {renderMenu(menu)}
      </Menu>
    </div>
  )
}

export default withRouter(AdminSidebar)
