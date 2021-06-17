'use strict';

const Aliase = require(`../models/aliase`);

class ArticleService {
  constructor(sequelize) {
    // this._Sequelize = sequelize;
    this._Article = sequelize.models.Article;
    this._Comment = sequelize.models.Comment;
    this._Category = sequelize.models.Category;

    this._include = [
      {
        model: this._Category,
        as: Aliase.CATEGORIES,
        through: {attributes: []},
        attributes: [
          `id`,
          `title`,
        ]
      },
      {
        model: this._Comment,
        as: Aliase.COMMENTS,
        // attributes: []
      }
    ];
  }

  async create(article) {
    const newArticle = await this._Article.create(article);
    await newArticle.addCategories(article.categories);
    return newArticle.get();
  }

  async remove(id) {
    const deletedRows = await this._Article.destroy({
      where: {id}
    });

    return !!deletedRows;
  }

  async findAll() {
    // todo посчитать количество комментариев у статьи
    // const attributes = {
    //
    //   include: [
    //     [
    //       this._Sequelize.fn(`COUNT`, this._Sequelize.col(`comments.id`)),
    //       `commentsCount`,
    //     ]
    //   ]
    // };
    const articles = await this._Article.findAll({
      // attributes,
      include: this._include,
    });
    return articles.map((item) => item.get());
  }

  async findPage({limit, offset}) {
    const {count, rows} = await this._Article.findAndCountAll({
      limit,
      offset,
      include: this._include,
      distinct: true
    });
    return {count, articles: rows};
  }


  async findOne(id, needComments) {
    const include = [Aliase.CATEGORIES];
    if (needComments) {
      include.push(Aliase.COMMENTS);
    }
    return this._Article.findByPk(id, {include});
  }


  async update(id, article) {
    const [affectedRows] = await this._Article.update(article, {
      where: {id}
    });
    return !!affectedRows;
  }


}

module.exports = ArticleService;
