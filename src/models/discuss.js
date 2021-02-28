
import { fetchDiscussListI, addDiscussI, deleteCommentI, deleteReplyI } from '../services/discuss'

import { COLOR_LIST } from '../utils/constant'
import { randomIndex,getTagsCount } from '../utils/index'


// 生成 color
function genertorColor(list = [], colorList = []) {
  const _list = [...list].sort((x, y) => y.count - x.count)
  _list.forEach((l, i) => {
    l.color = colorList[i] || colorList[randomIndex(colorList)]
  })
  console.log(list)
  return _list
}

export default {

  namespace: 'discuss',
    state:{
      discussList:[]
    },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetchDiscussList({ payload, callback }, { call, put }) {  // eslint-disable-line
      const results = yield call(fetchDiscussListI, payload);
      const { code, data } = results;
      let tagList = [];
      if (code === 200) {
        tagList = getTagsCount(data);
        tagList = genertorColor(tagList, COLOR_LIST);
      }

      if (typeof callback === 'function') {
        callback({tagList});
      } else {
        yield put({ type: 'saveTagList',payload: results });
      }
    },
    *addDiscuss({ payload, callback }, { call, put }) {
      const results = yield call(addDiscussI, payload);
      if (typeof callback === 'function') {
        callback({ ...results })
      }
    },
    *deleteComment({ payload, callback }, { call, put}) {
      const results = yield call(deleteCommentI, payload);
      if (typeof callback === 'function') {
        callback({ ...results })
      }
    },
    *deleteReply({ payload, callback }, { call, put}) {
      const results = yield call(deleteReplyI, payload);
      if (typeof callback === 'function') {
        callback({ ...results })
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload }
    },
    saveTagList(state, action) {
      const { message, data } = action.payload
      let  tagList = []
      if(message === 'SUCCESS'){
        const taglst = getTagsCount(data.list);
         tagList = genertorColor(taglst, COLOR_LIST);
      }

      return { ...state, tagList };
    },
    }
};
