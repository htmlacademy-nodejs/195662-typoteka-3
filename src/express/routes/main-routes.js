'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();
const api = require(`../api`).getAPI();

const ARTICLES_PER_PAGE = 8;

mainRouter.get(`/`, async (req, res) => {
  let {page = 1} = req.query;
  page = +page;

  const limit = ARTICLES_PER_PAGE;
  const offset = (page - 1) * ARTICLES_PER_PAGE;
  const {count, articles} = await api.getArticles({limit, offset});
  const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);
  return res.render(`main`, {articles, page, totalPages});
});
mainRouter.get(`/register`, (req, res) => res.render(`sign-in`));
mainRouter.get(`/login`, (req, res) => res.render(`sign-in`));
mainRouter.get(`/categories`, (req, res) => res.render(`admin/categories`));
mainRouter.get(`/search`, async (req, res) => {
  try {
    const {search} = req.query;
    const results = await api.search(search);
    res.render(`search`, {results});
  } catch (error) {
    res.render(`search`, {results: []});
  }
});


module.exports = mainRouter;
