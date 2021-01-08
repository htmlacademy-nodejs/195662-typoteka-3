'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post`));
articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/publications-by-category`));
articlesRouter.get(`/add`, (req, res) => res.render(`articles/post-add`));
articlesRouter.get(`/edit/:id`, (req, res) => res.render(`articles/post-edit`));


module.exports = articlesRouter;
