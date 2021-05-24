"use strict";

const defineModels = require(`../models`);
const Aliase = require(`../models/aliase`);

module.exports = async (sequelize, {users, categories, articles}) => {
  const {User, Article, Category} = defineModels(sequelize);
  await sequelize.sync({force: true});
  /* Таблица users */
  await User.bulkCreate(
      users.map((item) => {
        return {
          email: item.email,
          firstname: item.firstname,
          lastname: item.lastname,
          password: item.password,
          avatar: item.avatar,
        };
      })
  );
  /* Таблица categories */
  await Category.bulkCreate(
      categories.map((item) => {
        return {
          title: item
        };
      })
  );
  /* Таблица articles, comments и articles_categories*/
  const articlePromises = articles.map(async (article) => {
    const articleModel = await Article.create(article, {
      include: [Aliase.COMMENTS]
    });
    articleModel.addCategories(article.categories);
  });
  await Promise.all(articlePromises);
};
