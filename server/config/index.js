const devMode = process.env.NODE_ENV === 'development';

const config = {
    PORT: 3002, //  启动端口
    ADMIN_GITHUB_LOGIN_NAME: 'lcmomo', // 博主的 github 登录的账户名 user
    GITHUB: {
        client_id: 'c6a96a84105bb0be1fe5',
        client_secret: '463f3994ab5687544b2cddbb6cf44920bf179ad9',
        access_token_url: 'https://github.com/login/oauth/access_token',
        fetch_user_url: 'https://api.github.com/user', // 用于 oauth2
        fetch_user: 'https://api.github.com/users/' // fetch user url https://api.github.com/users/gershonv
    },
    EMAIL_NOTICE: {
        // 邮件通知服务
        // detail: https://nodemailer.com/
        enable: true, // 开关
        transporterConfig: {
          host: 'smtp.163.com',
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: '1494145746@qq.com', // generated ethereal user
            pass: 'llx7107.' // generated ethereal password 授权码 而非 密码
          }
        },
        subject: '默墨的博客 - 您的评论获得新的回复！', // 主题
        text: '您的评论获得新的回复！',
        WEB_HOST: 'http://127.0.0.1:3000' // email callback url
      },
    TOKEN: {
        secret: 'chao',  // token secret
        expiresIn: '720h' // 有效期
    },
    DATABASE: {
        database: 'sqtest',
        user: 'sqtest',
        password: '1',
        options: {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            define: {
                timestamps: false, // 默认不加时间戳
                freezeTableName: true // 默认表名不加s
            },
            dialectOptions:{
              charset:'utf8mb4',  //字符集
              collate:'utf8mb4_unicode_ci'
          },
            timezone: '+08:00'

        }
    }
}

//  生产环境
if (!devMode) {
    console.log('env production...');
    config.DATABASE = {
        ...config.DATABASE,
        password: 'llx1234',
        options: {
          host: 'www.llchaoblogs.work',
          dialect: 'mysql',
          pool: {
              max: 5,
              min: 0,
              acquire: 30000,
              idle: 10000
          },
          define: {
              timestamps: false, // 默认不加时间戳
              freezeTableName: true // 默认表名不加s
          },
          dialectOptions:{
            charset:'utf8mb4',  //字符集
            collate:'utf8mb4_unicode_ci'
        },
          timezone: '+08:00'
    }
  }

    // 配置 github 授权
  config.GITHUB.client_id = ''
  config.GITHUB.client_secret = ''

  // ==== 配置 token 密钥
  config.TOKEN.secret = ''

  // ==== 配置邮箱

  // config.EMAIL_NOTICE.enable = true
  config.EMAIL_NOTICE.transporterConfig.auth = {
    user: '2485426408@qq.com', // generated ethereal user
    pass: 'llx6107.' // generated ethereal password 授权码 而非 密码
  }
  config.EMAIL_NOTICE.WEB_HOST = 'http://www.llchaoblogs.work'
}

module.exports = config;

