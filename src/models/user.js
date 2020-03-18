import * as TYPES from './type.js'
import {get,remove,save } from '../utils/storage'
import {loginI,fetchByUserNameI, fetchUserByEmailI,createUserI} from '../services/user'

const userInfo = get('userInfo')

let defaultState={
  userInfo: {
            username:'',
            role:1,
            userid:0,
            github:null
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
    
      const results=yield call(loginI,payload)
     
      if (typeof callback === 'function') {
        callback(results);
      }
      yield put({type:'savelogin' ,payload:results.data})


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
      yield put({ type: 'savelogout' });
    
    },

    //添加用户列表
    *createUser({payload,callback},{call}){
      console.log('resgister')
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
    // save(state, action) {
    //   return { ...state, ...action.payload };
    // },
    savelogout(state,action){
      remove('userInfo');
      return { ...state, username: '', userId: 0, role: 2, github: null }
    },
    savelogin(state,action){
     
     
      if(action.payload && action.payload.user){
      const {user,token}=action.payload
     
      const { username, userid, role, github = null } = user
      save('userInfo', { username, userid, role, github, token })
      return { ...state, username, userid, role, github }
      }else{
        return { ...state}
      }
     
     
      // return {...state,...action.payload}
    }

   


    
  },

};
