import { stringify } from 'qs';
import request from '../utils/request.js';
export async function addDiscussI(params){
    return request(`/discuss`, {
      method:'POST',
      body: {...params },
    }).then(res=>res.data);
}

export async function deleteCommentI(params) {
  return request(`/discuss/comment/${ params }`, { method: 'DELETE' }).then(res => res.data);
}

export async function deleteReplyI(params) {
  return request(`/discuss/reply/${ params }`, { method: 'DELETE' }).then(res => res.data);
}