'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleValidator = require(`../middlewares/article-validator`);

const route = new Router();

module.exports = (app, articleService) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const categories = articleService.findAll();
    res.status(HttpCode.OK).json(categories);
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).send(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);
    return res.status(HttpCode.CREATED).send(article);
  });
};
