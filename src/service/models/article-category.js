"use strict";

const {Model} = require(`sequelize`);

const sequelize = require(`../lib/sequelize`);

class ArticleCategory extends Model {}

ArticleCategory.init({}, {
  sequelize,
  modelName: `ArticleCategory`,
  tableName: `articles_categories`
});

module.exports = ArticleCategory;
