import {stringify} from 'qs';
import request from '../utils/request';
import { ITEM_NAME } from '../config/config.js';
import {getItemEnv } from '../utils/index.js';
const baseUrl=getItemEnv==="development"?`http://localhost:8080`:`http://www.llchaoblogs.work:8080/${ITEM_NAME}`;

export async function fetchByEmailI(params){
    return request(`${baseUrl}/user/findByEmail?${stringify(params)}`).then(res=>res.data);
}

export async function createUserI(params){
    return request(`${baseUrl}/user/add`,{
        method:'POST',
        body:params,

    }).then(res=>res.data);
}