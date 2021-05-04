"use strict";

const defineUser = require(`./user`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineArticle = require(`./article`);
const defineArticleCategory = require(`./article-category`);
const Aliase = require(`./aliase`);


const define = (sequelize) => {
  const User = defineUser(sequelize);
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);
  const ArticleCategory = defineArticleCategory(sequelize);

  User.hasMany(Article, {
    as: Aliase.ARTICLES,
    foreignKey: `userId`,
  });
  User.hasMany(Comment, {
    as: Aliase.COMMENTS,
    foreignKey: `userId`,
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
  Comment.belongsTo(User, {
    as: Aliase.USERS,
    foreignKey: `userId`,
  });
  Comment.belongsTo(Article, {
    as: Aliase.ARTICLES,
    foreignKey: `articleId`,
  });
  Category.belongsToMany(Article, {
    as: Aliase.ARTICLES,
    through: ArticleCategory,
    foreignKey: `categoryId`,
  });
  return {User, Article, Comment, Category, ArticleCategory};
};

module.exports = define;
