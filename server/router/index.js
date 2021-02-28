const Router = require('koa-router');
const router = new Router();

// controllers
const UserController = require('../controllers/user');
const ArticleController = require('../controllers/article');
const TagController = require('../controllers/tag');
const DiscussController = require('../controllers/discuss');

// article router
const articleRouter = new Router();
// discuss router
const discussRouter = new Router();


articleRouter.get('/list', ArticleController.getArticleList); // 获取文章列表
articleRouter.get('/:id', ArticleController.findById); // 获取文章详情

discussRouter.post('/', DiscussController.create) // 添加评论
  .delete('/comment/:id', DiscussController.deleteComment) // 删除评论
  .delete('/reply/:id', DiscussController.deleteReply);

router.use('/article', articleRouter.routes());
router.use('/discuss', discussRouter.routes());
// tag category
router.get('/tag/list', TagController.getTagList); // 获取所有的 tag 列表

router.post('/user/login', UserController.login); // 登录
router.post('/user/register', UserController.register); // 注册
const userRouter = new Router();

userRouter.get('/web/home/list', UserController.getUserList); // 获取用户列表

module.exports = router;

