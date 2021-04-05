import React, { Component } from 'react'
import { connect } from 'dva'


 class App extends Component {
     componentDidMount(){
         console.log("app did mount")
     }

     //解析route
    //  renderRoutes(routes,contextPath){
    //      const _this=this
    //      const children=[]
    //      const props=this.props.init

    //      const renderRoute=(item,routeContextPath)=>{
    //         let newContextPath = item.path ? `${routeContextPath}/${item.path}` : routeContextPath
    //         newContextPath = newContextPath.replace(/\/+/g, '/')
    //         if (newContextPath.includes('admin') && props.role !== 1) {
    //             item = {
    //               ...item,
    //               component: () => <Redirect to='/' />,
    //               children: []
    //             }
    //           }

    //           if (item.component) {
    //             if (item.childRoutes) {
    //               const childRoutes =  _this.renderRoutes(item.childRoutes, newContextPath)
    //               children.push(
    //                 <Route
    //                   key={newContextPath}
    //                   render={props => <item.component {...props}>{childRoutes}</item.component>}
    //                   path={newContextPath}
    //                 />
    //               )
    //               item.childRoutes.forEach(r => renderRoute(r, newContextPath))
    //             } else {
    //               children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />)
    //             }
    //         } 
    //         } 
            
    //         routes.forEach(item => renderRoute(item, contextPath))

    //         return <Switch>{children}</Switch>   
    //  }


    render() {
        return (<div>APP</div>)

    }
}
export default connect()(App)
