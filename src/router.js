import React from 'react';
import { Router, Switch } from 'dva/router';
// import IndexPage from './pages/IndexPage';
// import Home from './pages/Home';
// import Menus from './pages/Menus';
// import About from './pages/About';
// import Admin from './pages/Admin';
// import Login from './pages/User/Login';
// import Register from './pages/User/Register';
import SubRoutes from './utils/SubRoutes';

// 私有路由的开关
const isAuthority = true;

const RouteConfig = [
  {
    path: '/',
    // component: IndexPage,
    title:'首页',
    exact :true,
    component: () => import('./pages/IndexPage.js'),
    model: [import('./models/user.js')],
    routes: [
      {
        path: '/home',
       //component: () => import('./pages/Home'),
        model: [import('./models/home')],
        redirect: true,
        isAuthority
      },
      {
        path: '/menus',
       // component: () => import('./pages/Menus'),
        model: [],
        isAuthority
      },
      {
        path: '/admin',
      //  component: () => import('./pages/Admin'),
        model: [],
        isAuthority
      },
      {
        path: '/about',
       // component: () => import('./pages/About'),
        model: [],
        isAuthority,
        routes: [
          {
            path: '/about/history',
            model: [],
          //  component: () => import('./pages/About/History')
          },
          {
            path: '/about/contact',
            model: [],
          //  component: () => import('./pages/About/Contact'),
            routes: [
              {
                path: '/about/contact/phone',
                model: [],
            //    component: () => import('./pages/About/Phone')
              },
              {
                path: '/about/contact/address',
                model: [],
              //  component: () => import('./pages/About/Address')
              }
            ]
          },
          {
            path: '/about/orderingguide',
            model: [],
          //  component: () => import('./pages/About/OrderingGuide')
          },
          {
            path: '/about/delivery',
            model: [],
           // component: () => import('./pages/About/Delivery')
          }
        ]
      },
      {
        path: '/login',
       // component: () => import('./pages/User/Login'),
        model: []
      },
      {
        path: '/register',
       // component: () => import('./pages/User/Register'),
        model: []
      }
    ]
  },
  {
    path: '/admin/login',
    // component: IndexPage,
    component: () => import('./pages/admin/adminLogin.js'),
    model: [],
  }
];

function RouterConfig({ history, app }) {
  // console.log('router.js');
  // console.log(app);
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" component={IndexPage} /> */}
        {RouteConfig.map((route, i) => (
          // 调用封装组件
          <SubRoutes key={i} {...route} app={app} />
        ))}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
