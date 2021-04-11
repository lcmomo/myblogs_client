const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const logger = require('koa-logger');

// config
const config = require('./config');

const router = require('./router');

const db = require('./models');

const app = new Koa();

// context binding...
const context = require('./utils/context');
Object.keys(context).forEach(key => {
    app.context[key] = context[key] // 绑定上下文对象
})

// TODO moddlewares
// moddlewares
const authHandler = require('./middlewares/authHandler');

const path = require('path');


app.use(cors(
    // {
    //     origin: (ctx) => ctx.header.origin
    //     // maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    //     // credentials: true, //是否允许发送Cookie
    //     // allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    //     // allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    //     // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    // }
))
    .use(
        koaBody({
            multipart: true,
            formidable: {
                //uploadDir: path.resolve(_dirname, '/upload')
                keepExtensions: true, //保持文件后缀
                maxFileSize: 2000 * 1024 // 上传文件大小
            }
        })
    )
    .use(authHandler)
    .use(logger());


 // todo router  
app.use(router.routes(), router.allowedMethods());
app.listen(config.PORT, () => {
    db.sequelize.sync({ force: false, logging: false}) // If force is true, each DAO will do DROP TABLE IF EXISTS ..., before it tries to create its own table
        .then(async () => {
            const initData = require('./initData');
            initData(); // 创建初始化数据
            console.log('seqelize connect success');
            console.log(`server listen on http://127.0.0.1:${config.PORT}`);
        }).catch(err => {
            console.log(err);
        })
})
