import { stringify } from 'qs';
import request from '../utils/request.js';


//const baseUrl=getItemEnv==="development"?`http://localhost:8080`:`http://www.llchaoblogs.work:8080/${ITEM_NAME}`
export async function fetchArticleListI(params) {
    return request(`/article/list?${stringify(params)}`).then(res => res.data);
}
export async function fetchByKeywordsI(params) {
    return request(`/article/findbykeywords?${stringify(params)}`).then(res => res.data);
}

export async function fetchArticleDetailI(params) {
  console.log(params)
  return request(`/article/${params}`).then(res => res.data)
}

