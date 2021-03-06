import React from 'react';
import { Router, Switch } from 'dva/router';
import SubRoutes,{ RedirectRoute } from './utils/SubRoutes.js'
import { RouteConfig } from './routes/common/router.js'

function RouterConfig({ history,app }) {

  return (
    <Router history={ history }>
      {/* <Switch>
        <Route path="/" exact component={App} />
      </Switch>
       */}
      <Switch>
         {
         RouteConfig.map((route, index) => (

            <SubRoutes key={ index } { ...route } app={ app } />
        ))}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
