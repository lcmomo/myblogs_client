import {
  fetchByEmailI,
  createUserI
} from '../services/user.js'



export default {
    namespace: 'user',
  
    state: {

      userInfo: {
        email: null,
        pwd: null,
        key: null,
        token:null,
        auth:false
      },
    },
  
    subscriptions: {},
  
    effects: {
      // dispatch 用户信息
      *setUserInfo({ payload }, { put }) {
        // eslint-disable-line
        yield put({ type: 'set_userinfo', payload });
      },

      *findByEmail({payload,callback},{call}){
        const results=yield call(fetchByEmailI,payload);
       
        if (typeof callback === 'function') {
          callback(results);
        }
      },

      *createUser({payload,callback},{call}){
        const response=yield call(createUserI,payload);
        //console.log(payload);
       
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      },
    },
  
    reducers: {
      // 设置用户信息 userInfo的state
      set_userinfo(state, { payload }) {
        return { ...state, userInfo: payload };
      }
    }
  };
  