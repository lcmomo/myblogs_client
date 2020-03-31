
import {get,remove,save } from '../utils/storage'
import {fetchTagListI} from '../services/tag'

import { COLOR_LIST } from '../utils/constant'
import { randomIndex,getTagsCount } from '../utils/index'


// 生成 color
function genertorColor(list = [], colorList = []) {
  
  const _list = [...list].sort((x, y) => y.count - x.count)
  _list.forEach((l, i) => {
    l.color = colorList[i] || colorList[randomIndex(colorList)]
  })
  console.log("l")
  console.log(list)
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

  namespace: 'tag',


    state:{
      tagLst:[]
    },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetchTagList({ payload,callback }, { call, put }) {  // eslint-disable-line
      const results=yield call(fetchTagListI,payload);
    

      if (typeof callback === 'function') {
            callback(results);
          }
      yield put({ type: 'saveTaglist',payload:results });
    },
   
    // *findByUsername({payload,callback},{call}){
    //   const results=yield call(fetchByUserNameI,payload);
     
    //   if (typeof callback === 'function') {
    //     callback(results);
    //   }
    // },
    
  },

  reducers: {
    saveTaglist(state, action) {
      const {message,data} = action.payload
      let  tagList =[]
      if(message==='SUCCESS'){
        const taglst=getTagsCount(data.list)
         tagList = genertorColor(taglst, COLOR_LIST)
       // tagList= 

       
      }
       
     

      return { ...state, tagList:tagList };
    },
    
    }

   
};
