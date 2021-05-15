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

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);

const app = new Router();

defineModels(sequelize);

module.exports = app;

(async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(sequelize));
  search(app, new SearchService(sequelize));
  article(app, new ArticleService(mockData), new CommentService());
})();
