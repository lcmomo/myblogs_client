import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Layout,Icon,Row,Col,BackTop} from 'antd'
import { Switch } from 'dva/router'

import Header from './header'
import SiderBar from './sidebar'
import AppMain from './AppMain'
import SubRoutes,{ RedirectRoute,NoMatchRoute }from '../../utils/SubRoutes'
//响应式
const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 }
const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 }

// const WebLayout = props =>{
//   console.log(props)
//   const {app,routes} =props
//   return (
//     <Layout className='app-container'>
//       <Header />
//       <Row className='app-wrapper'>
//         <Col {...siderLayout}>
//           <SiderBar />
//         </Col>
//         <Col {...contentLayout}>
//           {/* <AppMain {...props } /> */}
//             <div className='app-main'>
//               <Switch>
//                       {routes.map((route, i) => (
                        
                        
//                         // 调用封装组件
//                       <SubRoutes key={i} {...route} app={app}  />
//                       ))}

//               </Switch>

//             </div>
//         </Col>
//       </Row>
//         {/* <BackTop target={() => document.querySelector('.app-main')} /> */}
//     </Layout>
//   )
// }





 class WebLayout extends Component {

  constructor(props){
    super(props)
  }
  render() {
    const {app,routes} =this.props
    return (
     
    <Layout className='app-container'>
      <Header />
      <Row className='app-wrapper'>
        <Col {...siderLayout}>
          <SiderBar />
        </Col>
        <Col {...contentLayout}>
          {/* <AppMain {...this.props } /> */}
            <div className='app-main'>
              <Switch>
                      {routes.map((route, i) => (
                        
                        
                        // 调用封装组件
                      <SubRoutes key={i} {...route} app={app}  />
                      ))}

              </Switch>

            </div>
        </Col>
      </Row>
        {/* <BackTop target={() => document.querySelector('.app-main')} /> */}
    </Layout>
    )
  }
}

export default WebLayout