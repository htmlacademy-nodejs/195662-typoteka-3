"use strict";

const {DataTypes, Model} = require(`sequelize`);

// const sequelize = require(`../lib/sequelize`);
const Aliase = require(`./aliase`);

class Comment extends Model {}

module.exports = class CommentModel {
  init(sequelize) {
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
  }
  defineAssociations(sequelize) {
    Comment.belongsTo(sequelize.models.User, {
      as: Aliase.USERS,
      foreignKey: `userId`,
    });
    Comment.belongsTo(sequelize.models.Article, {
      as: Aliase.ARTICLES,
      foreignKey: `articleId`,
    });
  }
  getModel() {
    return Comment;
  }
};
