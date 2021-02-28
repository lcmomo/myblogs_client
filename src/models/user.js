import * as TYPES from './type.js'
import {get, remove, save } from '../utils/storage'
import {loginI,fetchByUserNameI, fetchUserByEmailI,createUserI, registerI }  from '../services/user'

const userInfo = get('userInfo')

let defaultState={
  userInfo: {
    username: '',
    role: 1,
    userid: 0,
    github: null
    },
}

if (userInfo) {
  defaultState = { ...defaultState, ...userInfo }
}


export default {

  namespace: 'user',
//     state:{
//       userInfo: {
//         username:'',
//         role:1,
//         userid:0,
//         github:null
//       },
// },

  state:defaultState,
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    //登录
    *login({payload,callback},{call,put}){
      const results = yield call(loginI, payload)

      if (typeof callback === 'function') {
        callback(results);
      }
      yield put({type:'saveLogin' ,payload: results.data })


    },
    //根据用户名找
    *findByUsername({payload,callback},{call}){
      const results=yield call(fetchByUserNameI,payload);
     
      if (typeof callback === 'function') {
        callback(results);
      }
    },
    //根据邮箱查找
    *findUserByEmail({payload,callback},{call,put}){
      const results=yield call(fetchUserByEmailI,payload);
     
      if (typeof callback === 'function') {
        callback(results);
      }
    },

    //退出登录
    *logout({ payload }, { call, put }){
      yield put({ type: 'saveLogout' });
    
    },

    //添加用户列表
    *createUser({payload,callback},{call}){
      // console.log('resgister')
      const response=yield call(createUserI,payload);
      //console.log(payload);
     
      if(response.message==="SUCCESS"){
        if (typeof callback === 'function') {
          callback();
        }
      }
    },

    // 注册
    *register({payload,callback},{call}){
      // console.log('resgister')
      const response = yield call(registerI,payload);
      //console.log(payload);

        if (typeof callback === 'function') {
          callback(response);
        }
    },

  },

  reducers: {
    // save(state, action) {
    //   return { ...state, ...action.payload };
    // },
    saveLogout(state,action){
      remove('userInfo');
      return { ...state, username: '', userId: 0, role: 2, github: null }
    },
    saveLogin(state,action){

      if(action.payload){
        // console.log("login reducer")
        // console.log(action.payload)
        const { username, userId, role, github = null, token } = action.payload
        save('userInfo', { username, userId, role, github, token })
        return { ...state, username, userId, role, github }
      } else{
        return { ...state }
      }
      // return {...state,...action.payload}
    }

   


    
  },

};
