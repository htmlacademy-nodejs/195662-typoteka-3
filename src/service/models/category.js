"use strict";

const {DataTypes} = require(`sequelize`);
const Aliase = require(`./aliase`);

module.exports = class CategoryModel {
  constructor(sequelize) {
    this._sequelizeInstance = sequelize;
    this._model = sequelize.define(`Category`, {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: Aliase.CATEGORIES,
      underscored: true,
    });
  }
  defineAssociations() {
    this._model.belongsToMany(this._sequelizeInstance.models.Article, {
      as: Aliase.ARTICLES,
      through: Aliase.ARTICLE_CATEGORIES,
      foreignKey: `categoryId`,
    });
  }
  getModel() {
    return this._model;
  }
};
