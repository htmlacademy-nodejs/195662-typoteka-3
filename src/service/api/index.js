'use strict';

const {Router} = require(`express`);
const category = require(`./category`);

const getMockData = require(`../lib/get-mock-data`);

const {CategoryService} = require(`../data-service`);

const app = new Router();

module.exports = app;

(async () => {
  const mockData = getMockData();

  category(app, new CategoryService(mockData));
})();
