"use strict";
const UserModel = require(`./user`);
const CategoryModel = require(`./category`);
const CommentModel = require(`./comment`);
const ArticleModel = require(`./article`);

const getDefinedModels = (store) => {
  const res = {};
  Object.keys(store).forEach((key) => {
    res[key] = store[key].getModel();
  });
  return res;
};

const define = (sequelize) => {
  const modelStore = {
    User: new UserModel(sequelize),
    Category: new CategoryModel(sequelize),
    Article: new ArticleModel(sequelize),
    Comment: new CommentModel(sequelize),
  };
  Object.values(modelStore).forEach((model) => {
    model.defineAssociations();
  });

  return getDefinedModels(modelStore);
};

module.exports = define;
