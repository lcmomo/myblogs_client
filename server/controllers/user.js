const Joi = require('joi');
const axios = require('axios');
const { GITHUB }  = require('../config');

const { decodeQuery } = require('../utils');
const { comparePassword, encrypt } = require('../utils/bcrypt');
const { createToken } = require('../utils/token');
const { user: UserModel, comment: CommentModel, reply: ReplyModel, sequelize } = require('../models');

/**
 * 读取github用户信息
 * @param {String} username  - github用户名 
 */
 async function getGithubInfo(username) {
     try {
         const result = await axios.get(`${GITHUB.fetch_user}${username}`);
         return result && result.data;
    } catch (error) {
        console.error("======", '请检查登录用户名是否正确');
        throw error;
    }
 }


 class UserController {
     // 查找用户
     static find(params) {
         return UserModel.findOne({ where: params});
     }

     // 创建用户
     static createGithubUser(data, role = 2) {
        const { id, login, email } = data;
        return UserModel.create({
            id,
            username: login,
            role,
            email,
            github: JSON.stringify(data)
        });        
     }

     //更新用户信息
     static updateUserById(userId, data) {
         return UserModel.update(data, {where: {id: userId}});
     }
     //登录 
     static async login(ctx) {
        const { code } = ctx.request.body;
        if (code) {
            await UserController.githubLogin(ctx, code);
        } else {
            await UserController.defaultLogin(ctx);
        }

     }

     // 站内用户登录
     static async defaultLogin(ctx) {
         const validator = ctx.validate(ctx.request.body, {
             account: Joi.string().required(),
             password: Joi.string()
         });
         if (validator) {
             try {
                const { account, password, email } = ctx.request.body;
                const user = await UserModel.findOne({
                    where: {
                        // $or: { email: account, username: account },
                        email: email,
                    }
                });

                if(!user) {
                    ctx.client(403, '用户不存在');
                } else {
                    const isMatch = await comparePassword(password, user.password);
                    if(!isMatch) {
                        ctx.client(403, '密码不正确');
                    } else {
                        const { id, role, username } = user;
                        const token = createToken({username, userId: id, role }); // 生成token
                        ctx.client(200, '登录成功', { username: user.username, role, userId: id, token });
                    }
                }

            }catch (error) {
                console.error(error);
                throw error;
            }
         }
     }

     // github login

     static async githubLogin(ctx, code) {
        try {
            const result = await axios.post(GITHUB.access_token_url, {
                client_id: GITHUB.client_id,
                client_secret: GITHUB.client_secret
            });

            const { access_token } = decodeQuery(result.data);

            if (access_token) {
                // 拿到access_token 去获取用户信息
                const result2 = await axios.get(`${GITHUB.fetch_user_url}?access_token=${access_token}`);
                const githubInfo = result2.data;

                let target = await UserController.find({ id: githubInfo.id });//数据库中查找用户是否存在
                if ( !target) {
                    target = await UserController.create({
                        id: githubInfo.id,
                        username: githubInfo.name || githubInfo.username,
                        github: JSON.stringify(githubInfo),
                        email: githubInfo.email
                    });
                } else {
                    if (target.github !== JSON.stringify(githubInfo)) {
                        // github 信息发生变动
                        const { id, login, email } = githubInfo;
                        const data = {
                            username: login,
                            email,
                            github: JSON.stringify(githubInfo)
                        };
                        await UserController.updateUserById(id, data);
                    }
                }

                const token = createToken({userId: githubInfo.id, role: target.role})
                ctx.client(200, 'success', {
                    github: githubInfo,
                    username: target.username,
                    userId: target.id,
                    role: target.role,
                    token
                });
            } else {
                ctx.client(403, 'github 授权码已失效！');
            }
        } catch (error) {
            ctx.client(500, 'github 登录超时');
        }
     }

     // 注册
     static async register(ctx) {
         const validator = ctx.validate(ctx.request.body, {
             username: Joi.string().required(),
             password: Joi.string().required(),
             email: Joi.string().email().required()
         });

         if (validator) {
             const { username, password, email} = ctx.request.body;
             const result = await UserModel.findOne({ where: { email } });
             if (result) {
                ctx.client(403, '邮箱已被注册');
             } else {
                 const user = await UserModel.findOne({ where: { username }});
                 if (user && !user.github) {
                     ctx.client(403, '用户名已被占用');
                 } else {
                    const saltPassword = await encrypt(password);
                    await UserModel.create({ username, password: saltPassword, email });
                    ctx.client(200, '注册成功');
                 }
             }
         }
     }

     //获取用户列表
     static async getUserList(ctx) {
         const validator = ctx.validate(ctx.query, {
             username: Joi.string(),
             pageNo: Joi.string(),
             pageSize: Joi.number()
         });

         if (validator) {
            const { pageNo = 1, PageSize = 10, username} = ctx.query;
            const where = {
                role: {
                    $not: 1
                }
            }
         }
         if (username) {
             where.username['$like'] = `%${username}%`;
         }
         const result = await UserModel.findAndCountAll({
             where,
             offset: (pageNo - 1) * pageSize,
             limit: parseInt(pageSize),
             row: true,
             order: [['createAt', 'DESC']]
         });
         ctx.client(200, 'success', result);
     }

     // 删除
     static async delete(ctx) {
         const validator = ctx.validate(ctx.params, {
             userId: Joi.number().required()
         });
         if (validator) {
             await sequelize.query(
                 `delete comment, reply from comment left join reply on comment.id = reply.commentId where comment.userId=${ctx.params.userId}`
             )
             await UserModel.destroy({ where: { id: ctx.params.userId } });
             ctx.client(200);
         }
     }

    // 更新用户
    static async updateUser(ctx) {
        const validator = ctx.validate({
            ...ctx.params,
            ...ctx.request.body
        }, {
            userId: Joi.number().required(),
            notice: Joi.boolean()
        });

        if (validator) {
            try {
                const { userId } = ctx.params;
                const { notice } = ctx.request.body;
                await UserController.updateUserById(userId, { notice });
                ctx.client(200);
            } catch (error) {
                ctx.client(500, '更新失败');
                throw error;
            }
        }
    }

   // 初始化用户
   static async initGithubUser(githubLoginName) {
       const github = await getGithubInfo(githubLoginName);
       const temp = await UserController.find({ id: github.id });
       if (!temp) {
           UserController.createGithubUser(github, 1);
       }
   }
 }

 module.exports = UserController;
 