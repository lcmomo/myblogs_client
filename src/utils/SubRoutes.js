import React from 'react'
import { Route,Redirect,exact } from 'dva/router';
import dynamic from 'dva/dynamic';
import {connect} from 'dva'
import NoMatch from '../components/NoMatch/NoMatch.js';


//解决动态加载路由组件方法
const dynamicCom =(app,models,component,routes,isAuthority,userInfo)=>
  dynamic({
    app,
    models:() => models,
    component:()=>
      component().then(res=>{
       //console.log(userInfo)
        // if(isAuthority){
        //   //判断userInfo.id是否有内容
        //   // if(!(localStorage.getItem('email')||localStorage.getItem('key'))){
        //   //   return ()=> <Redirect to ="/login" />
        //   // }
        // }
        const Component =res.default || res;
        return props => <Component {...props} app={app} routes={routes} />
      })
  })

 function SubRoutes({routes,component,app,model,isAuthority,exact,userInfo}) {
  
  return (
    <Route
      component={dynamicCom(app,model,component,routes,isAuthority,userInfo)}
      
    />
       
   
  )
}


export default connect(
  ({init})=>({userInfo: {}})
  )(SubRoutes)

//重定向封装组件
export function RedirectRoute({routes,from,exact}){
  const routeR=routes.filter((item)=>{

    return item.redirect;
  });
  const to=routeR.length ? routeR[0].path:routes[0].path;
  return <Redirect exact={exact} from ={from} to={to}/>
}
//连接不存在时
export function NoMatchRoute({status = 404}){
  return <Route render={props=><NoMatch {...props} status={status}/>}/>
}

