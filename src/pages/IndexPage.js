import React from 'react';
import { connect } from 'dva';
import {BrowserRouter as Router } from 'dva/router'
import Home from '../routers/index.js'
function IndexPage() {
  return (
    
     <Router>
       <Home />
     </Router>
      
    
  );
}

IndexPage.propTypes = {
};

// let mapStateToProps = state => {
//   let { loading } = state.common
//   return {
//     loading
//   }
// }

export default connect()(IndexPage);
