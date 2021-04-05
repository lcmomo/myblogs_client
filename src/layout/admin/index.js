import React,{ Component } from 'react';
import { Layout } from 'antd';
import {Switch } from  'dva/router';
import AdminSideBar from './sidebar'
import AdminHeader from './header'
import SubRoutes from '../../utils/SubRoutes.js'

 const { Sider, Header,Content,Footer } = Layout

// const AdminLayout = props =>{

//   const [collapsed,setCollapsed] =useState(false)
//   const {app,routes}=props
//   console.log("pr")
//   console.log(props)

//   return (
//     <Layout className='admin-container'>
//       <Sider collapsible trigger={null} collapsed={collapsed}>
//         <AdminSideBar />
//       </Sider>
//       <Layout>
//         <Header className='admin-header'>
//           <AdminHeader collapsed={collapsed} onToggle={e => setCollapsed(!collapsed)} />
//         </Header>
//         <Content className='admin-main'>
//           <Switch>
//                 {routes.map((route, i) => (
                   
//                   // 调用封装组件
//                   <SubRoutes key={i} {...route} app={app} />
//                 ))}

               
//             </Switch>
//             div
//         </Content>
//         {/* <Footer style={{ textAlign: 'center' }}>React-Admin ©2019 Created by gershonv@163.com </Footer> */}
//       </Layout>
//     </Layout>
//   )


// }



//export default AdminLayout

export default class AdminLayout extends Component {
  constructor(props){
    super(props)
    this.state={
      collapsed:false,
      setCollapsed:false

    }
  }
  render() {
    const { app, routes, location } = this.props;

    const {collapsed } =this.state;
    return (
    <Layout className='admin-container'>
       <Sider collapsible trigger={null} collapsed={collapsed}>
         <AdminSideBar  selectedKeys={[location.pathname]} collapsed={collapsed} />
       </Sider>
       <Layout>
         <Header className='admin-header'>
           <AdminHeader collapsed={collapsed} onToggle={e => this.setState({ collapsed: !collapsed })} />
         </Header>
          <Layout className='admin-content-wrap'>
            <Content className='admin-main'>

              <Switch>
                    {routes.map((route, i) => (

                      // 调用封装组件
                    <SubRoutes key={i} {...route} app={app}  />
                    ))}

    {/* <NoMatchRoute /> */}
              </Switch>

            </Content>
          </Layout>
        <Footer style={{ textAlign: 'center' }}>Myblogs ©2021 Created by lcmomo </Footer>
      </Layout>
    </Layout>
  )

  }
}
