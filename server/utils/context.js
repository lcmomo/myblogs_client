const response = require('./response');
const Joi = require('joi');


/**
 * 
 * @param {Object} params  // 需要被验证的key-value 
 * @param {Object} schema // 验证规则
 */
function validate(params = {}, schema = {}) {
    const ctx = this;
    const validator = Joi.validate(params, Joi.object().keys(schema), { allowUnknown: true });
    if (validate.error) {
        ctx.client(403, validate.error.message)
        return false;
    }
    return true;
}

// 绑定app.context ctx.func 直接调用
module.exports = {
    client: response,
    validate: validate
}