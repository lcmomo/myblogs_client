
import { fetchArticleListI, fetchArticleDetailI,
  articleCheckExistI,
  deleteArticleByIdI,
  updateArticleByIdI,
  createArticleI
 } from '../services/article';
import { fetchTagListI } from '../services/tag';
// import { fetchCategoryI } from '../services/category'

import { COLOR_LIST } from '../utils/constant'
import { randomIndex } from '../utils/index'



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
    // 获取文章列表
    *fetchArticleList({ payload, callback }, { call, put }) {  // eslint-disable-line
      const results = yield call(fetchArticleListI, payload);
      const tagResults = yield call(fetchTagListI);
      // const categoryList = yield call(fetch)
      // const categoryList = yield call()

      const { data, code } = results
      let  articleLst = []
      let tagColorList = []
      let categoryList = []
      if (code === 200){
        tagColorList = genertorColor(tagResults.data, COLOR_LIST)
        articleLst = data.rows;
        // tagColorList = genertorColor(tagResults.data | []);
        categoryList = genertorColor(data.rows, COLOR_LIST);
      }

      if (typeof callback === 'function') {
        callback({ articleList: articleLst, categoryList, tagColorList, total: data.count, pageNum: data.pageNum, pageSize: data.size });
      } else {
        yield put({ type: 'saveArticleList', payload: results });
      }
    },

    // 获取文章详情
    *fetchArticleDetail({ payload, callback }, { call, put }) {
      const results = yield call(fetchArticleDetailI, payload);
      const { data, code } = results;
      if (code === 200) {
        if (typeof callback === 'function') {
          callback(data);
        } else {
          yield put({ type: 'saveArticle', payload: results });
        }
      }
    },

    // 检查文章是否存在

    *checkExist({ payload, callback }, { call, put }) {
      const result = yield call(articleCheckExistI, payload);
      const { code, data } = result;
      if (code === 200) {
        if (typeof callback === 'function') {
          callback(data);
        }
      }
    },
    // 删除文章
    *deleteArticle({ payload, callback}, {call, put }) {
      const result =yield call(deleteArticleByIdI, payload);
      const { code } = result;
      if (code === 200) {
        if (typeof callback === 'function') {
          callback(result);
        }
      }
    },
    // 更新文章
    *updateArticle({ payload, callback }, { call, put }) {
     const result = yield call(updateArticleByIdI, payload);
     if (typeof callback === 'function') {
       callback(result);
     }
    },
     *createArticle({ payload, callback }, { call, put }) {
      const result = yield call(createArticleI, payload);
      if (typeof callback === 'function') {
        callback(result);
      }
    }
  },

  reducers: {
    saveArticleList(state, action) {
      const { data, code } = action.payload
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
      const { data } = action.payload
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
