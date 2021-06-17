'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExists = require(`../middlewares/article-exists`);
const commentValidator = require(`../middlewares/comment-validator`);

module.exports = (app, articleService, commentService) => {
  const route = new Router();

  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const {limit, offset} = req.query;
    let articles;
    if (limit || offset) {
      articles = await articleService.findPage({limit, offset});
    } else {
      articles = await articleService.findAll();
    }
    res.status(HttpCode.OK).json(articles);
  });

  route.get(`/:articleId`, articleExists(articleService), async (req, res) => {
    const {articleId} = req.params;
    const {comments} = req.query;

    const article = await articleService.findOne(articleId, comments);

    return res.status(HttpCode.OK).json(article);
  });

  route.post(`/`, articleValidator, async (req, res) => {
    const article = await articleService.create(req.body);
    return res.status(HttpCode.CREATED).json(article);
  });

  route.put(`/:articleId`, [articleValidator, articleExists(articleService)], async (req, res) => {
    const {articleId} = req.params;

    const updatedArticle = await articleService.update(articleId, req.body);

    return res.status(HttpCode.OK).json(updatedArticle);
  });

  route.delete(`/:articleId`, articleExists(articleService), async (req, res) => {
    const {articleId} = req.params;

    const deletedArticle = await articleService.remove(articleId);

    return res.status(HttpCode.OK).json(deletedArticle);
  });

  route.get(`/:articleId/comments`, articleExists(articleService), async (req, res) => {
    const {articleId} = req.params;

    const comments = await commentService.findAll(articleId);

    res.status(HttpCode.OK).json(comments);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExists(articleService), async (req, res) => {
    const {commentId} = req.params;

    const deletedComment = await commentService.remove(commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${commentId}`);
    }

    return res.status(HttpCode.OK).json(deletedComment);
  });

  route.post(`/:articleId/comments`, [articleExists(articleService), commentValidator], async (req, res) => {
    const {articleId} = req.params;
    const comment = await commentService.create(articleId, req.body);

    return res.status(HttpCode.CREATED).json(comment);
  });
};
