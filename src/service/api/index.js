'use strict';

const {Router} = require(`express`);
const category = require(`./category`);
const search = require(`./search`);
const article = require(`./article`);

const getMockData = require(`../lib/get-mock-data`);

const {
  CategoryService,
  SearchService,
  ArticleService,
  CommentService,
} = require(`../data-service`);

const app = new Router();

module.exports = app;

(async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
  article(app, new ArticleService(mockData), new CommentService());
})();
