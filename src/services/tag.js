import { stringify } from 'qs';
import request from '../utils/request.js';
export async function fetchTagListI(params){
    return request(`/tag/list?${stringify(params)}`).then(res=>res.data);
}