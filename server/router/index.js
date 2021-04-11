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
articleRouter.post('/checkExist', ArticleController.checkExist); // 确认文章是否存在
articleRouter.get('/output/all', ArticleController.outputAll); //  导出所有文章
articleRouter.get('/output/:id', ArticleController.output); // 根据id导出单个文章
articleRouter.delete('/:id', ArticleController.delete); // 删除指定文章
articleRouter.put('/:id', ArticleController.update); //  更新文章
articleRouter.post('/add', ArticleController.create) // 创建文章

discussRouter.post('/', DiscussController.create) // 添加评论
  .delete('/comment/:id', DiscussController.deleteComment) // 删除评论
  .delete('/reply/:id', DiscussController.deleteReply);

// tag category
router.get('/tag/list', TagController.getTagList); // 获取所有的 tag 列表

router.post('/user/login', UserController.login); // 登录
router.post('/user/register', UserController.register); // 注册

// user

const userRouter = new Router();

userRouter.get('/list', UserController.getUserList); // 获取用户列表
userRouter.delete('/:userId', UserController.delete); // 删除用户
userRouter.put('/:userId', UserController.updateUser); // 更新用户信息

router.use('/user', userRouter.routes());
router.use('/article', articleRouter.routes());
router.use('/discuss', discussRouter.routes());

module.exports = router;

