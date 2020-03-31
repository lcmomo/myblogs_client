
import {get,remove,save } from '../utils/storage'
import {fetchArticleListI,fetchByKeywordsI} from '../services/article'

import { COLOR_LIST } from '../utils/constant'
import { randomIndex,getTagsCount } from '../utils/index'


// 生成 color
function genertorColor(list = [], colorList = []) {
  
  const _list = [...list].sort((x, y) => y.count - x.count)
  _list.forEach((l, i) => {
    l.color = colorList[i] || colorList[randomIndex(colorList)]
  })
 
  return _list
}

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

  namespace: 'article',


    state:{
      articleLst:[]
    },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetchArticleList({ payload,callback }, { call, put }) {  // eslint-disable-line
      const results=yield call(fetchArticleListI,payload);
    

      if (typeof callback === 'function') {
            callback(results);
          }
      yield put({ type: 'saveArticlelist',payload:results });
    },
   
    *findBKeywords({payload,callback},{call,put}){
  
      const results=yield call(fetchByKeywordsI,payload);
      yield put({type:'saveArticlelist',payload:results})
      if (typeof callback === 'function') {
        callback(results);
      }
    },
    
  },

  reducers: {
    saveArticlelist(state, action) {
      const {message,data} = action.payload
      let  articleList =[]
      if(message==='SUCCESS'){
       
        articleList=data.list
       
      }
       
     

      return { ...state, articleList:articleList ,total:data.total};
    },

    findByKey(state,action){
      const { message,data } = action.payload
      return {
        articleList:data.list
      }
    }
    
    }

   
};
