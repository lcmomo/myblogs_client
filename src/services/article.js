
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
  console.log("idL : ", params)
  return request(`/article/${params}`).then(res => res.data)
}

export async function articleCheckExistI(params) {
  return request(`/article/checkExist`,{
    method:'POST',
    body:{...params},
  }).then(res=>res.data);
}
export async function  deleteArticleByIdI(params) {
  return request(`/article/${params}`, {
    method: 'DELETE'
  }).then(res => res.data);
}

export async function updateArticleByIdI(params) {
  const { editId } = params;
  return request(`/article/${editId}`, {
    method: 'PUT',
    body: { ...params }
  }).then(res => res.data)
}

export async function createArticleI(params) {
  return request(`/article/add`, {
    method: 'POST',
    body: { ...params }
  }).then(res => res.data)
}