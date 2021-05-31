"use strict";

const {DataTypes, Model} = require(`sequelize`);

const sequelize = require(`../lib/sequelize`);
const Aliase = require(`./aliase`);
const User = require(`./user`);
const Article = require(`./article`);

class Comment extends Model {}

Comment.init({
  text: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: `Comment`,
  tableName: `comments`
});

Comment.belongsTo(User, {
  as: Aliase.USERS,
  foreignKey: `userId`,
});
Comment.belongsTo(Article, {
  as: Aliase.ARTICLES,
  foreignKey: `articleId`,
});

module.exports = Comment;
