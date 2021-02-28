import React, { Component } from 'react'
import { connect } from 'dva'
import { Switch ,withRouter} from 'dva/router'

import { Spin } from 'antd'
import { GITHUB } from '../../config'
import {decodeQuery} from '../../utils/index'
import { get, remove} from '../../utils/storage'
import SubRoutes,{ RedirectRoute,NoMatchRoute }from '../../utils/SubRoutes'


class AppMain extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
  render() {
    
    const { routes,app} =this.props

    // if (GITHUB.loadingType === 1 || !GITHUB.enable) 
    // return 
    
    // (<div className='app-main'>
    //      <Switch>
    //              {routes.map((route, i) => (
                  
                   
    //               // 调用封装组件
    //             <SubRoutes key={i} {...route} app={app}  />
    //             ))}

    //        </Switch>

    // </div>)

    return (

      (<div className='app-main'>
         <Switch>
                 {routes.map((route, i) => (
                  
                   
                  // 调用封装组件
                <SubRoutes key={i} {...route} app={app}  />
                ))}

           </Switch>

    </div>)
    )
  }
}

export default connect()(withRouter(AppMain))

