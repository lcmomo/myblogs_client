import {stringify} from 'qs';
import request from '../utils/request.js';

import { ITEM_NAME } from '../config.js'
import { getItemEnv}  from '../utils/index.js'

const baseUrl=getItemEnv() ==="development"?`http://localhost:8080`:`http://www.llchaoblogs.work:8080/${ITEM_NAME}`

//const baseUrl=getItemEnv==="development"?`http://localhost:8080`:`http://www.llchaoblogs.work:8080/${ITEM_NAME}`
export async function fetchArticleListI(params){
    return request(`${baseUrl}/article/list?${stringify(params)}`).then(res=>res.data);
}
export async function fetchByKeywordsI(params){
  console.log(params)
    return request(`${baseUrl}/article/findbykeywords?${stringify(params)}`).then(res=>res.data);
}

export async function fetchArticleDetailByIdI(params){
  console.log(params)
    return request(`${baseUrl}/article/detail?${stringify(params)}`).then(res=>res.data);
}