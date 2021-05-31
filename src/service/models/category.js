"use strict";

const {DataTypes, Model} = require(`sequelize`);

const sequelize = require(`../lib/sequelize`);
const Aliase = require(`./aliase`);
const Article = require(`./article`);
const ArticleCategory = require(`./article-category`);


class Category extends Model {}

Category.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: `Category`,
  tableName: `categories`
});

Category.belongsToMany(Article, {
  as: Aliase.ARTICLES,
  through: ArticleCategory,
  foreignKey: `categoryId`,
});

module.exports = Category;
