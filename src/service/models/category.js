"use strict";

const {DataTypes, Model} = require(`sequelize`);

// const sequelize = require(`../lib/sequelize`);
const Aliase = require(`./aliase`);


class Category extends Model {}

module.exports = class CategoryModel {
  init(sequelize) {
    Category.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: `Category`,
      tableName: `categories`
    });
  }
  defineAssociations(sequelize) {
    Category.belongsToMany(sequelize.models.Article, {
      as: Aliase.ARTICLES,
      through: Aliase.ARTICLE_CATEGORIES,
      foreignKey: `categoryId`,
    });
  }
  getModel() {
    return Category;
  }
};
