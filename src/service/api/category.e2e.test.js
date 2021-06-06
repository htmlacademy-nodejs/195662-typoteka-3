'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const category = require(`./category`);
const DataService = require(`../data-service/category`);
const {HttpCode} = require(`../../constants`);

const mockUsers = [
  {
    "email": `ivanov@example.com`,
    "firstname": `Иван`,
    "lastname": `Иванов`,
    "password": `5f4dcc3b5aa765d61d8327deb882cf99`,
    "avatar": `avatar1.jpg`
  },
  {
    "email": `petrov@example.com`,
    "firstname": `Пётр`,
    "lastname": `Петров`,
    "password": `5f4dcc3b5aa765d61d8327deb882cf99`,
    "avatar": `avatar2.jpg`
  }
];
const mockCategories = [
  `Инструменты`,
  `Животные`,
  `Игры`,
];
const mockArticles = [
  {
    "title": `тайтл`,
    "picture": `пикча`,
    "announce": `анонс`,
    "text": `текс`,
    "user_id": 1,
    "categories": [2],
    "comments": [],
  },
];

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDB(mockDB, {
    users: mockUsers,
    categories: mockCategories,
    articles: mockArticles,
  });
  category(app, new DataService(mockDB));
});


describe(`API return category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 3 categories`, () => expect(response.body.length).toBe(3));

  test(`Category names are "Инструменты", "Животные", "Игры"`,
      () => expect(response.body.map((item) => item.title)).toEqual(
          expect.arrayContaining([`Инструменты`, `Животные`, `Игры`])
      )
  );

});
