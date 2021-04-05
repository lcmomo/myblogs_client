
export default {

  namespace: 'init',

  state: {
    count: 1,
    windowWidth: 0,
    signModal: {
      visible: false,
      type: 'login'
    },
    uploadModal: {
      visible: false
    },
    resultModal: {
      visible: false,
      result: null
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    // *fetch({ payload }, { call, put }) {  // eslint-disable-line
    //   yield put({ type: 'save' });
    // },

    *addCount ({ payload, callback }, { call, put }) {
      yield put({ type: 'appDemoAddCount'})

    },
    //获取视口宽度
    *getWindowWidth({ payload }, {call, put}) {
      const body = document.getElementsByTagName('body')[0];
      yield put({type:'updateWindowWidth', payload: body.clientWidth })
    },
    //切换登录注册框
    *switchSignModal({ payload }, {call, put}) {
      console.log("dispatch switch")
      yield put({ type: 'switchSignModalR', payload: payload})
    },

    //切换上传md文件框
    *switchUploadModal({ payload }, {call, put }) {
      yield put({type: 'switchUploadModalR', payload: payload})
    },
    *updateResultModal({ payload }, { call, put }) {
      yield put({ type: 'updateResultModalR', payload: payload })
    }
  },

  reducers: {
    // save(state, action) {
    //   return { ...state, ...action.payload };
    // },
    appDemoAddCount(state, action) {
      return { ...state, count: ++state.count };
    },
    updateWindowWidth(state, action){
      return {...state, windowWidth: action.payload };
    },
    switchSignModalR(state, action){

      return { ...state,  signModal: action.payload }
    },
    switchUploadModalR(state, action) {
      console.log("uplaodModual: ", action.payload)
      return { ...state, uploadModal: action.payload };
    },
    updateResultModalR(state, action) {
      return { ...state, resultModal: action.payload };
    }

  },

};
