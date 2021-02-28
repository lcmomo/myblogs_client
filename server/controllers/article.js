const Joi = require('joi');

// import models
const {
    article: ArticleModel,
    tag: TagModel,
    category: CategoryModel,
    comment: CommentModel,
    reply: ReplyModel,
    user: UserModel,
    sequelize
} = require('../models');

// console.log(ArticleModel)

const fs = require('fs');

// const {uploadPath} = require

class ArticleController {
    //  初始化数据 关于页面（用于评论关联）
    static async initAboutPage() {
        const result = await ArticleModel.findOne({ where: { id: -1 } });
        if (!result) {
            ArticleModel.create({
                id: -1,
                title: '关于页面',
                content: '关于页面存档，勿删'
            });
        }
    }

    // 获取文章列表

    static async getArticleList (ctx) {
        const validator = ctx.validate(ctx.query, {
            pageNo: Joi.string(),
            pageSize: Joi.number(),
            keyword: Joi.string(),
            category: Joi.string(),
            tag: Joi.string(),
            preview: Joi.number(),
            order: Joi.string(),
        })

        if (validator) {
            try {
                const { pageNo = 1, pageSize = 10, preview = 1, keyword = '', tag, category, order } = ctx.query;
                const categoryFilter = category ? { name: category } : null;
                const  tagFilter = tag ? { name: tag } : null;

                let articleOrder = [['createdAt', 'DESC']];
                if (order) {
                    articleOrder = [order.split(' ')];
                }

                const data = await ArticleModel.findAndCountAll({
                    where: {
                        id: {
                            $not: -1 // 过滤关于页面的副本
                        },
                        $or: {
                            title: {
                                $like: `%${keyword}%`
                            },
                            content: {
                                $like: `%${keyword}%`
                            }
                        }
                    },
                    include: [
                        { model: TagModel, attributes: ['name'], where: tagFilter },
                        { model: CategoryModel, attributes: ['name'], where: categoryFilter },
                        {
                            model: CommentModel,
                            attributes: ['id'],
                            include: [
                                {
                                model: ReplyModel,
                                attributes: ['id']
                                }
                            ]
                        }
                    ],
                    offset: (pageNo - 1) * pageSize,
                    limit: parseInt(pageSize),
                    order: articleOrder,
                    row: true,
                    distinct: true // count计算
                });

                if (preview === 1) {
                    data.rows.forEach(d => {
                        d.count = d.content.slice(0,1000) // 只是预览，减少大量的数据传输
                    });
                }

                ctx.client(200, 'success', data);
            } catch(error) {
                ctx.client(500, '查找失败', error);
                throw error;
            }
        }
    }

    // 获取文章详情
    static async findById(ctx) {
        const validator = ctx.validate({ ...ctx.params, ...ctx.query }, {
            id: Joi.number().required(),
            type: Joi.number() // 用于区分是否增加浏览次数 1： 增加， 0： 不增加
        });

        if (validator) {
            try {
                const data = await ArticleModel.findOne({
                    where: { id: ctx.params.id },
                    include: [
                        //分类 标签， 评论，回复
                        { model: TagModel, attributes: ['name'] },
                        { model: CategoryModel, attributes: ['name'] },
                        {
                            model: CommentModel,
                            attributes: ['id', 'content', 'createdAt'],
                            include: [
                                { model: UserModel, as: 'user', attributes: ['id', 'username', 'role', 'github'] },
                                {
                                    model: ReplyModel,
                                    attributes: ['id', 'userId', 'content', 'createdAt'],
                                    include: [
                                        { model: UserModel, as: 'user', attributes: ['id', 'username', 'role', 'github'] }
                                    ]
                                }
                            ]
                        }
                    ],
                    order: [
                        [ CommentModel, 'createdAt', 'DESC']
                    ],
                    row: true
                })
                const { type = 1 } = ctx.query;
                // viewerCount ++
                type === 1 && ArticleModel.update({ viewCount: ++data.viewCount }, { where: { id: ctx.params.id } })
                // JSON.parse(github)
                data.comments.forEach(comment => {
                    comment.user.github = JSON.parse(comment.user.github);
                    comment.replies.forEach( reply => {
                        reply.user.github = JSON.parse(reply.user.github);
                    });
                });
                ctx.client(200, 'success', data);
            } catch (error) {
                ctx.client(500, 'fail', error)
            }
        }
    }
}

module.exports = ArticleController;