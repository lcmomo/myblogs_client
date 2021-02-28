const Joi = require('joi');
const { EMAIL_NOTICE } = require('../config');
// const { getEmailData, sendEmail } = require('../utils/email');

const {
  article: ArticleModel,
  tag: TagModal,
  category: CategoryModel,
  comment: CommentModel,
  reply: ReplyModel,
  user: UserModal,
  sequelize
} = require('../models');
/**
 * 邮件通知
 * userid - 添加评论的用户Id
*/

// async function sendingEmail(articleId, commentList, commentId, userId) {
//   const article = await ArticleModel.findOne({
//     where: {
//       id: articleId
//     },
//     attributes: ['id', 'title']
//   });
//   const target = commentList.rows.find(d => d.id === parseInt(commentId));
//   const { emailList, html } = getEmailData(article, target, userId);
//   Promise.all(emailList.map(receiver => sendEmail({ receiver, html }))).then(res => {
//     console.log('success to send email');
//   }).catch(e => {
//     console.log('fail to send email', e)
//   })
// }

class DiscussController {

  static async create(ctx) {
    const validator = ctx.validate(ctx.request.body, {
      articleId: Joi.number().required(),
      userId: Joi.number().required(),
      content: Joi.string().required(),
      commentId: Joi.number() // 回复相应的评论
    })

    if (validator) {
      try {
        const { articleId, userId, content } = ctx.request.body;
        let commentId = ctx.request.body.commentId;
        if (!commentId) {
          // 添加评论
          const comment = await CommentModel.create({
            userId,
            articleId,
            content
          });
          commentId = comment.id;
        } else {
          // 添加回复
          await ReplyModel.create({
            userId,
            articleId,
            content, commentId
          })
        }
        const list = await DiscussController.fetchCommentList(articleId);
        // EMAIL_NOTICE.enable && sendingEmail(articleId, list, commentId, userId);
        ctx.client(200, 'success', list);
      } catch (error) {
        console.log('chucuole: ', error)
        ctx.client(500, '请检查内容', error);
      }
    }
  }

  static async deleteComment(ctx) {
    const validator = ctx.validate(ctx.params, {
      id: Joi.number().required()
    });

    if (validator) {
      const commentId = ctx.params.id;
      try {
      await sequelize.query(`delete comment, reply from comment left join reply on comment.id = reply.commentId where comment.id = ${commentId}`)
      ctx.client(200, '删除成功', null);
      } catch (err) {
        ctx.client(500, err, null)
      }
    } else {
      ctx.client(500, "error", null)
    }
  }

  static async deleteReply(ctx) {
    const validator = ctx.validate(ctx.params, {
      id: Joi.number().required()
    })
    try {
    if (validator) {
      const replyId = ctx.params.id;
      await ReplyModel.destroy({
        where: {
          id: replyId
        }
      });
      ctx.client(200,'删除成功', null)
    }
  } catch(err) {
    ctx.client(500, err, null)
  }
  }

  static async fetchCommentList(articleId) {
    try {
      const data = await CommentModel.findAndCountAll({
        where: { articleId },
        attributes: ['id', 'content', 'createdAt'],
        include: [
          {
            model: ReplyModel,
            attributes: ['id', 'content', 'createdAt'],
            include: [
              {
                model: UserModal, as: 'user', attributes: { exclude: ['updatedAt', 'password'] }
              }
            ]
          },
          {
            model: UserModal,
            as: 'user',
            attributes: {
              exclude: ['updatedAt', 'password']
            }
          }
        ],
        row: true,
        order: [[ 'createdAt', 'DESC']]
      })

      // 格式化github
      data.rows.forEach(comment => {
        comment.user.github = JSON.parse(comment.user.github);
        comment.replies.forEach(reply => {
          reply.user.github = JSON.parse(reply.user.github)
        });
      });
    return data;
    } catch (err) {
      return null;
    }
  }
}

module.exports = DiscussController;

