import {stringify} from 'qs';
import request from '../utils/request.js';

import { ITEM_NAME } from '../config.js'
import { getItemEnv }  from '../utils/index.js'

//const baseUrl=getItemEnv()==='development'?"http://120.95.133.187:8080":'http://59.110.141.166:8080';
const baseUrl=getItemEnv() === "development" ? `http://localhost:3002` : `http://www.llchaoblogs.work:8080/${ITEM_NAME}`
export async function fetchUserListI(params){
    return request(`/user?${stringify(params)}`).then(res=>res.data);
}
export async function fetchCurrentUserI(params){
    return request(`/user/detail?${stringify(params)}`).then(res=>res.data);
}

export async function createUserI(params){
    return request(`/user/add`,{
        method:'POST',
        body:params,

    }).then(res=>res.data);
}

export async function deleteUserRecordI(params){
    return request(`/user/delete`,{
        method:'DELETE',
        body:params,
    }).then(res=>res.data);
}

export async function updateUserI(params){

    return request(`/user/update`,{
        method:'PUT',
        body:params,
    }).then(res=>res.data);
}


export async function fetchByUserNameI(params){

    return request(`/user/findByUsername?${stringify(params)}`).then(res=>res.data);
}



export async function fetchUserByEmailI(params){
    return request(`/user/findByEmail?${stringify(params)}`).then(res=>res.data);
}

export async function loginI(params){
    console.log("login params: ", params);
    return request(`/user/login`,{
        method:'POST',
        body:{...params},
    }).then(res=>res.data);
    
}

export async function registerI(params){
    console.log("register params: ", params);
   
    return request(`/user/register`,{
        method:'POST',
        body:{...params},
    }).then(res=>res.data);
}
