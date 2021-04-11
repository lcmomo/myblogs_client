import { stringify } from 'qs';
import request from '../utils/request.js';

export async function fetchUserListI(params){
    return request(`/user/list?${stringify(params)}`).then(res=> {  console.log("service res: ", res); return res.data });
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

export async function deleteUserI(params){
    return request(`/user/${params}`,{
        method:'DELETE'
    }).then(res=>res.data);
}

export async function updateUserI(params){
  const { userId } = params;
    return request(`/user/${userId}`,{
        method:'PUT',
        body: { ...params },
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
