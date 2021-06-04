"use strict";
const UserModel = require(`./user`);
const CategoryModel = require(`./category`);
const CommentModel = require(`./comment`);
const ArticleModel = require(`./article`);

const define = (sequelize) => {
  const userModel = new UserModel(sequelize);
  const categoryModel = new CategoryModel(sequelize);
  const commentModel = new CommentModel(sequelize);
  const articleModel = new ArticleModel(sequelize);
  const models = [
    userModel,
    categoryModel,
    commentModel,
    articleModel,
  ];
  models.forEach((model) => {
    model.init();
  });
  models.forEach((model) => {
    model.defineAssociations();
  });

  const User = userModel.getModel();
  const Category = categoryModel.getModel();
  const Article = articleModel.getModel();

  return {User, Article, Category};
};

module.exports = define;
