const Joi = require('joi');

const { uploadPath, outPath, decodeFile, generateFile, outputPath } = require('../utils/file.js');
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
const send = require('koa-send');
const archiver = require('archiver');

// const {uploadPath} = require
/**
 *
 *
 * @class ArticleController
/**
 *
 *
 * @class ArticleController
 */
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

    static async getArticleList(ctx) {
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
                const tagFilter = tag ? { name: tag } : null;

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
                        d.count = d.content.slice(0, 1000) // 只是预览，减少大量的数据传输
                    });
                }

                ctx.client(200, 'success', data);
            } catch (error) {
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
                        [CommentModel, 'createdAt', 'DESC']
                    ],
                    row: true
                })
                const { type = 1 } = ctx.query;
                // viewerCount ++
                type === 1 && ArticleModel.update({ viewCount: ++data.viewCount }, { where: { id: ctx.params.id } })
                // JSON.parse(github)
                data.comments.forEach(comment => {
                    comment.user.github = JSON.parse(comment.user.github);
                    comment.replies.forEach(reply => {
                        reply.user.github = JSON.parse(reply.user.github);
                    });
                });
                ctx.client(200, 'success', data);
            } catch (error) {
                ctx.client(500, 'fail', error)
            }
        }
    }
    /**
     * 确认文章是否存在
     *
     * @response existList: 数据库中已存在有的文章（包含文章的具体内容）
     * @response noExistList: 解析 md 文件 并且返回数据库中不存在的 具体有文件名 解析后的文件标题
     */
    static async checkExist(ctx) {
        const validator = ctx.validate(ctx.request.body, {
            fileNameList: Joi.array().required()
        })

        if (validator) {
            const { fileNameList } = ctx.request.body;
            const existList = []; // 存在的文件名列表
            const noExistList = [];

            try {
                const list = await Promise.all(fileNameList.map(async fileName => {
                    const filePath = `${uploadPath}/${fileName}`;
                    const result = decodeFile(filePath);
                    const title = result.title || fileName.replace(/\.md/, '');
                    const article = await ArticleModel.findOne({ where: { title }});
                    if (article) {
                        existList.push({ fileName, articleId: article.id, title: article.title });
                    } else {
                        const params = { fileName, title: result.title };
                        params.title ? noExistList.unshift(params): noExistList.push(params);
                    }
                    return article;
                }));

                ctx.client(200, 'success', { existList, noExistList });
            } catch (err) {
                ctx.client(500, '服务器错误', {})
            }
        }
    }

    // 导出文章
    static async output (ctx) {
        const validator = ctx.validate(ctx.params, {
            id: Joi.number().required()
        });
        if (validator) {
          try {
            const article = await ArticleModel.findOne({
              where: { id: ctx.params.id },
              include: [
                //  查找分类
                { model: TagModel, attributes: ['name'] },
                { model: CategoryModel, attributes :['name'] }
              ]
            });
            const { filePath, fileName } = await generateFile(article);
            ctx.attachment(decodeURI(fileName));
            await send(ctx, fileName, { root: outPath});

          } catch (err) {
            ctx.client(500, 'md 文件导出失败')
          }
        }
    }

    // 导出所有文章
    static async outputAll(ctx) {
      try {
        const list = await ArticleModel.findAll({
          where: {
            id: {
              $not: -1 // 过滤关于页面的副本（留言）
            }
          },
          include: [
            // 查找分类
            {
              model: TagModel, attributes: ['name']
            },
            {
              model: CategoryModel, attributes: ['name']
            }
          ]
        });

        await Promise.all(list.map(article => generateFile(article)));
        // 打包压缩
        const zipName = 'mdFiles.zip';
        const zipStream = fs.createWriteStream(`${outputPath}/${zipName}`);
        const zip = archiver('zip');
        zip.pipe(zipStream);
        list.forEach(item => {
          zip.append(fs.createReadStream(`${outputPath}/${item.title}.md`), {
            name: `${item.title}.md` // 压缩文件名
          });
        });
        await zip.finalize();
        ctx.send(ctx, zipName, { root: outputPath });
      } catch (err) {
        ctx.client(500, null, err)
      }
    }

    /**
     *
     *
     * @static 根据id删除文章
     * @param {*} ctx
     * @memberof ArticleController
     */
    static async delete(ctx) {
      const validator = ctx.validate(ctx.params, {
        id: Joi.number().required()
      });
      if (validator) {
        try {
          const articleId = ctx.params.id;
          await TagModel.destroy({ where: { articleId }});
          await ArticleModel.destroy({ where: { id: articleId } });
          await sequelize.query(
            `delete comment, reply from comment left join reply on comment.id=reply.commentId where comment.articleId=${articleId} `
            );
            ctx.client(200, 'success', null);
          } catch (err) {
            ctx.client(500, '系统错误', null);
          }
        }
    }

  /**
   *
   *
   * @static 创建文章
   * @param {*} ctx
   * @memberof ArticleController
   */
  static async create(ctx) {
      const validator = ctx.validate(ctx.request.body, {
        authorId: Joi.number().required(),
        title: Joi.string().required(),
        content: Joi.string(),
        categoryList: Joi.array(),
        tagList: Joi.array()
      });

      if (validator) {
        try {
          const { title, content, categoryList = [], tagList = [], authorId } = ctx.request.body;
          const result = await ArticleModel.findOne({ where: { title }});
          if (result) {
            ctx.client(403, '创建失败，文章已存在！');
          } else {
            const tags = tagList.map(t => ({ name: t }));
            const categories = categoryList.map(c => ({ name: c }));
            const data = await ArticleModel.create({
              title, content, authorId, tags, categories
            }, { include: [ TagModel, CategoryModel ] });

            ctx.client(200, '创建成功', data)
          }
        } catch (err) {
            ctx.client(500, '创建失败', err);
        }
      }
    }

    /**
     *
     * 修改文章
     * @static
     * @param {*} ctx
     * @memberof ArticleController
     */
    static async update(ctx) {
      const validator = ctx.validate({
        articleId: ctx.params.id,
        ...ctx.request.body
      }, {
        articleId: Joi.number().required(),
        title: Joi.string(),
        content: Joi.string(),
        categories: Joi.array(),
        tags: Joi.array()
      });
      if (validator) {
        try {
          const { title, content, categories = [], tags = [] } = ctx.request.body;
          const articleId = parseInt(ctx.params.id);
          const tagList = tags.map(tag => ({ name: tag, articleId }));
          const categoryList = categories.map(cate => ({ name: cate, articleId }));

          await ArticleModel.update({ title, content }, { where: { id: articleId }});
          await TagModel.destroy({ where: { articleId }});
          await TagModel.bulkCreate(tagList);
          await CategoryModel.destroy({ where: { articleId } })
          await CategoryModel.bulkCreate(categoryList)
          ctx.client(200, '更新成功！')
        } catch (err) {
          ctx.client(500, '更新失败', err);
        }
      }
    }
}

module.exports = ArticleController;