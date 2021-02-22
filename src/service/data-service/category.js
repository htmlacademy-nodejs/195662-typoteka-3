'use strict';

class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    console.log(123);
    // const categories = this._articles.map((item) => item.category);
    return [`aa`, `bb`];
  }
}

module.exports = CategoryService;
