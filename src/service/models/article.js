"use strict";

const {DataTypes, Model} = require(`sequelize`);

// const sequelize = require(`../lib/sequelize`);
const Aliase = require(`./aliase`);

class Article extends Model {}

module.exports = class ArticleModel {
  init(sequelize) {
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
  }
  defineAssociations(sequelize) {
    Article.belongsTo(sequelize.models.User, {
      as: Aliase.USERS,
      foreignKey: `userId`,
    });
    Article.hasMany(sequelize.models.Comment, {
      as: Aliase.COMMENTS,
      foreignKey: `articleId`
    });
    Article.belongsToMany(sequelize.models.Category, {
      as: Aliase.CATEGORIES,
      through: Aliase.ARTICLE_CATEGORIES,
      foreignKey: `articleId`,
    });
  }
  getModel() {
    return Article;
  }
};
