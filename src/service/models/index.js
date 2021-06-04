"use strict";
const UserModel = require(`./user`);
const CategoryModel = require(`./category`);
const CommentModel = require(`./comment`);
const ArticleModel = require(`./article`);

const define = (sequelize) => {
  const userModel = new UserModel();
  const categoryModel = new CategoryModel();
  const commentModel = new CommentModel();
  const articleModel = new ArticleModel();
  const models = [
    userModel,
    categoryModel,
    commentModel,
    articleModel,
  ];
  models.forEach((model) => {
    model.init(sequelize);
  });
  models.forEach((model) => {
    model.defineAssociations(sequelize);
  });

  const User = userModel.getModel();
  const Category = categoryModel.getModel();
  const Article = articleModel.getModel();

  return {User, Article, Category};
};

module.exports = define;
