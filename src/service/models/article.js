"use strict";

const {DataTypes, Model} = require(`sequelize`);
const Aliase = require(`./aliase`);

class Article extends Model {}

module.exports = class ArticleModel {
  constructor(sequelize) {
    this._sequelizeInstance = sequelize;
    this._model = Article;
  }
  init() {
    this._model.init({
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
      sequelize: this._sequelizeInstance,
      modelName: `Article`,
      tableName: `articles`
    });
  }
  defineAssociations() {
    this._model.belongsTo(this._sequelizeInstance.models.User, {
      as: Aliase.USERS,
      foreignKey: `userId`,
    });
    this._model.hasMany(this._sequelizeInstance.models.Comment, {
      as: Aliase.COMMENTS,
      foreignKey: `articleId`
    });
    this._model.belongsToMany(this._sequelizeInstance.models.Category, {
      as: Aliase.CATEGORIES,
      through: Aliase.ARTICLE_CATEGORIES,
      foreignKey: `articleId`,
    });
  }
  getModel() {
    return this._model;
  }
};
