"use strict";

const {DataTypes, Model} = require(`sequelize`);

const sequelize = require(`../lib/sequelize`);
const Aliase = require(`./aliase`);
const Article = require(`./article`);
const Comment = require(`./comment`);

class User extends Model {}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: `User`,
  tableName: `users`
});

User.hasMany(Article, {
  as: Aliase.ARTICLES,
  foreignKey: `userId`,
});
User.hasMany(Comment, {
  as: Aliase.COMMENTS,
  foreignKey: `userId`,
});

module.exports = User;
