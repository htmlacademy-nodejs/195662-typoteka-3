'use strict';

const {Router} = require(`express`);
const myRouter = new Router();
const api = require(`../api`).getAPI();

myRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  return res.render(`admin/publications`, {articles});
});
myRouter.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles();
  return res.render(`admin/comments`, {articles: articles.slice(0, 3)});
});

module.exports = myRouter;
