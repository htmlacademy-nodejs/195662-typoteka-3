'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();
const api = require(`../api`).getAPI();

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/publications-by-category`));
articlesRouter.get(`/add`, (req, res) => res.render(`articles/post-add`));
articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post`));
articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories()
  ]);
  res.render(`articles/post-edit`, {article, categories});
});


module.exports = articlesRouter;
