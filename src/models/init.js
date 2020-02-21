import * as TYPES from './type.js'
export default {

  namespace: 'init',

  state: {
    count:1,
    user:{
      role:1
    },
    windowWidth:0,
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
    getWindowWidth({payload},{call,put}){
      put({type:'updateWindowWidth'})
    
    },
    switchSignModal({payload},{call,put}){
      put({type:'switchSignModal'})
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    updateWindowWidth(state,action){
      const body = document.getElementsByTagName('body')[0]
      return {...state,windowWidth:body.clientWidth}
    },
    switchSignModal(){

    }


    
  },

};
