import {stringify} from 'qs';
import request from '../utils/request.js';

import { ITEM_NAME } from '../config.js'
import { getItemEnv}  from '../utils/index.js'

const baseUrl="http://localhost:8080"
//const baseUrl=getItemEnv==="development"?`http://localhost:8080`:`http://www.llchaoblogs.work:8080/${ITEM_NAME}`
export async function fetchTagListI(params){
    return request(`${baseUrl}/tag/list?${stringify(params)}`).then(res=>res.data);
}
// export async function fetchCurrentUserI(params){
//     return request(`${baseUrl}/user/detail?${stringify(params)}`).then(res=>res.data);
// }
