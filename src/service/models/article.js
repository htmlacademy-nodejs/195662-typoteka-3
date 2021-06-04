"use strict";

const {DataTypes} = require(`sequelize`);
const Aliase = require(`./aliase`);

module.exports = class ArticleModel {
  constructor(sequelize) {
    this._sequelizeInstance = sequelize;
    this._model = sequelize.define(`Article`, {
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
      },
    }, {
      tableName: Aliase.ARTICLES,
      underscored: true,
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
