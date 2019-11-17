
import mockjs from 'mockjs'

import userMock from './mock/user.js';

import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'false';


const proxy={
    ...userMock,
    
};

export default(noProxy?{}:delay(proxy,300))
