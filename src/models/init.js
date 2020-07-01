import * as TYPES from './type.js'
export default {

  namespace: 'init',

  state: {
    count:1,
    user:{
      role:1
    },
    windowWidth:1366,
    signModal:{
      visible:false,
      type:'login'
    },
    uploadModal:{
      visible:false
    },
    resultModal:{
      visible:false,
      result:null
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    //获取视口宽度
    getWindowWidth({payload},{call,put}){
      put({type:'updateWindowWidth'})
    
    },
    //切换登录注册框
    switchSignModal({payload},{call,put}){
      console.log(payload)
      put({type:'switchSignModalR',payload:payload})
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    updateWindowWidth(state,action){
      const body = document.getElementsByTagName('body')[0]
      return {...state, windowWidth:body.clientWidth}
    },
    switchSignModalR(state,action){
   
       
      return { ...state,  ...action.payload }
    }


    
  },

};
