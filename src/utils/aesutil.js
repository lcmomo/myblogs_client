import CryptoJS from 'crypto-js';
import {PUB_KEY} from './constant.js'
 export const  encrypt=(word)=>{
    var key = CryptoJS.enc.Utf8.parse(PUB_KEY);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

/**
 * 解密
 * @param word
 * @returns {*}
 */
 export const  decrypt=(word)=>{
    var key = CryptoJS.enc.Utf8.parse(PUB_KEY);
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}