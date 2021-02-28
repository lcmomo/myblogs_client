
import {get, remove, save } from '../utils/storage'
import { fetchArticleListI, fetchByKeywordsI, fetchArticleDetailI } from '../services/article';
import { fetchTagListI } from '../services/tag';

import { COLOR_LIST } from '../utils/constant'
import { randomIndex, getTagsCount } from '../utils/index'


// 生成 color
export const genertorColor = (list = [], colorList = [])  =>  {

  const _list = [...list].sort((x, y) => y.count - x.count);
  _list.forEach((l, i) => {
    l.color = colorList[i] || colorList[randomIndex(colorList)];
  })

  return _list;
}

export default {

  namespace: 'article',

  state: {
    articleList: []
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetchArticleList({ payload, callback }, { call, put }) {  // eslint-disable-line
      const results = yield call(fetchArticleListI, payload);
      // const tagResult = yield call(fetchTagListI);
      // const categoryList = yield call()
      const { data, message, code } = results
      let  articleLst = []
      let tagColorList = []
      let categoryList = []
      if (code === 200){
        // tagColorList = genertorColor(tagResult.data, COLOR_LIST)
        articleLst = data.rows
        categoryList = genertorColor(data.rows, COLOR_LIST)
      }

      if (typeof callback === 'function') {
        callback({ articleList: articleLst, categoryList, tagColorList, total: data.count, pageNum: data.pageNum, pageSize: data.size });
      } else {
        yield put({ type: 'saveArticleList', payload: results });
      }
    },

    *fetchArticleDetail({ payload, callback }, { call, put }) {
      const results = yield call(fetchArticleDetailI, payload);
      const { data, message, code } = results;
      if (code === 200) {
        if (typeof callback === 'function') {
          callback(data);
        } else {
          yield put({ type: 'saveArticle', payload: results });
        }
      }
    }

  },

  reducers: {
    saveArticleList(state, action) {
      const { message, data, code } = action.payload
      let  articleLst = []
      let tagList = []
      let categoryList = []
      if (code === 200){
        tagList = genertorColor(data.rows, COLOR_LIST)
        articleLst = data.rows
        categoryList = genertorColor(data.rows, COLOR_LIST)

      }
      return { articleList: articleLst ,categoryList, tagList,total: data.count, pageNum:data.pageNum, pageSize: data.size};
    },

    findByKey(state,action){
      const { message,data } = action.payload
      return {
        articleList:data.list
      }
    },

    saveArticle (state, action) {
      const { message, data, code } = action.payload;
      return { ...state, data }
    }
    }


};
