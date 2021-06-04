"use strict";

const {DataTypes, Model} = require(`sequelize`);
const Aliase = require(`./aliase`);


class Category extends Model {}

module.exports = class CategoryModel {
  constructor(sequelize) {
    this._sequelizeInstance = sequelize;
    this._model = Category;
  }
  init() {
    this._model.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize: this._sequelizeInstance,
      modelName: `Category`,
      tableName: `categories`
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
