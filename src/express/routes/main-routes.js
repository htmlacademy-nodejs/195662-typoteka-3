'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();
const api = require(`../api`).getAPI();

mainRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  return res.render(`main`, {articles});
});
mainRouter.get(`/register`, (req, res) => res.render(`sign-in`));
mainRouter.get(`/login`, (req, res) => res.render(`sign-in`));
mainRouter.get(`/search`, (req, res) => res.render(`search`));
mainRouter.get(`/categories`, (req, res) => res.render(`admin/categories`));


module.exports = mainRouter;
