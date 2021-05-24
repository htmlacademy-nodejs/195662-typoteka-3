"use strict";

const {DataTypes, Model} = require(`sequelize`);

class Article extends Model {}

const define = (sequelize) => Article.init({
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

module.exports = define;
