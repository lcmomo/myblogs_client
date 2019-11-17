
export default {

  namespace: 'example',

  state: {
   
      auth:false
    
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    //dispatch 设置用户信息
    *setUserInfo({ payload }, {  put }) {  // eslint-disable-line
      yield put({ type: 'set_userinfo',payload });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    set_userinfo(state, {payload}) {
      return { ...state, userInfo:payload };
    },
  },

};
