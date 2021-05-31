"use strict";

const {DataTypes, Model} = require(`sequelize`);

const sequelize = require(`../lib/sequelize`);
const Aliase = require(`./aliase`);
const ArticleCategory = require(`./article-category`);
const Category = require(`./category`);
const User = require(`./user`);
const Comment = require(`./comment`);

class Article extends Model {}

Article.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  picture: {
    type: DataTypes.TEXT,
  },
  announce: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
  }
}, {
  sequelize,
  modelName: `Article`,
  tableName: `articles`
});

Article.belongsTo(User, {
  as: Aliase.USERS,
  foreignKey: `userId`,
});
Article.hasMany(Comment, {
  as: Aliase.COMMENTS,
  foreignKey: `articleId`
});
Article.belongsToMany(Category, {
  as: Aliase.CATEGORIES,
  through: ArticleCategory,
  foreignKey: `articleId`,
});

module.exports = Article;
