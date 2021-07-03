'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const article = require(`./article`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);
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
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];
const mockArticles = [
  {
    "title": `Самый лучший музыкальный альбом этого года`,
    "picture": `image03.jpg`,
    "announce": `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Это один из лучших рок-музыкантов. Он написал больше 30 хитов.`,
    "text": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Первая большая ёлка была установлена только в 1938 году. Золотое сечение — соотношение двух величин, гармоническая пропорция. Ёлки — это не просто красивое дерево. Это прочная древесина. Собрать камни бесконечности легко, если вы прирожденный герой. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Он написал больше 30 хитов. Простые ежедневные упражнения помогут достичь успеха. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Как начать действовать? Для начала просто соберитесь. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Это один из лучших рок-музыкантов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения. Из под его пера вышло 8 платиновых альбомов. Программировать не настолько сложно, как об этом говорят.`,
    "user_id": 1,
    "categories": [1, 9],
    "comments": [],
    "date": `2020-10-11`,
  },
  {
    "title": `Рок — это протест`,
    "picture": `image02.jpg`,
    "announce": `Как начать действовать? Для начала просто соберитесь.`,
    "text": `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Это один из лучших рок-музыкантов. Как начать действовать? Для начала просто соберитесь. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Золотое сечение — соотношение двух величин, гармоническая пропорция. Достичь успеха помогут ежедневные повторения. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно, как об этом говорят. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Ёлки — это не просто красивое дерево. Это прочная древесина. Первая большая ёлка была установлена только в 1938 году.`,
    "user_id": 2,
    "categories": [2, 3, 4],
    "comments": [
      {
        "user_id": 1,
        "text": `Это где ж такие красоты?`
      },
      {
        "user_id": 2,
        "text": `Совсем немного...`
      },
    ],
    "date": `2020-10-11`,
  },
  {
    "title": `Борьба с прокрастинацией`,
    "picture": `image01.jpg`,
    "announce": `Первая большая ёлка была установлена только в 1938 году. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    "text": `Как начать действовать? Для начала просто соберитесь. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Простые ежедневные упражнения помогут достичь успеха. Ёлки — это не просто красивое дерево. Это прочная древесина. Это один из лучших рок-музыкантов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Золотое сечение — соотношение двух величин, гармоническая пропорция. Программировать не настолько сложно, как об этом говорят. Он написал больше 30 хитов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Первая большая ёлка была установлена только в 1938 году. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    "user_id": 2,
    "categories": [3, 8],
    "comments": [],
    "date": `2020-10-11`,
  },
  {
    "title": `Как собрать камни бесконечности`,
    "picture": `image03.jpg`,
    "announce": `Он написал больше 30 хитов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Первая большая ёлка была установлена только в 1938 году. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    "text": `Это один из лучших рок-музыкантов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Ёлки — это не просто красивое дерево. Это прочная древесина. Простые ежедневные упражнения помогут достичь успеха. Из под его пера вышло 8 платиновых альбомов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Достичь успеха помогут ежедневные повторения. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Первая большая ёлка была установлена только в 1938 году. Программировать не настолько сложно, как об этом говорят. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Он написал больше 30 хитов.`,
    "user_id": 1,
    "categories": [4, 7, 9],
    "comments": [],
    "date": `2020-10-11`,
  },
  {
    "title": `Что такое золотое сечение`,
    "picture": `image02.jpg`,
    "announce": `Как начать действовать? Для начала просто соберитесь. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Достичь успеха помогут ежедневные повторения. Из под его пера вышло 8 платиновых альбомов.`,
    "text": `Он написал больше 30 хитов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    "user_id": 2,
    "categories": [1, 5, 6],
    "comments": [],
    "date": `2020-10-11`,
  },
  {
    "title": `Учим HTML и CSS`,
    "picture": `image01.jpg`,
    "announce": `Достичь успеха помогут ежедневные повторения. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно, как об этом говорят.`,
    "text": `Первая большая ёлка была установлена только в 1938 году. Золотое сечение — соотношение двух величин, гармоническая пропорция. Ёлки — это не просто красивое дерево. Это прочная древесина. Собрать камни бесконечности легко, если вы прирожденный герой. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Он написал больше 30 хитов. Простые ежедневные упражнения помогут достичь успеха. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Как начать действовать? Для начала просто соберитесь.`,
    "user_id": 1,
    "categories": [2, 4, 8],
    "comments": [],
    "date": `2020-10-11`,
  },
];


const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  await initDB(mockDB, {
    users: mockUsers,
    categories: mockCategories,
    articles: mockArticles,
  });

  const app = express();
  app.use(express.json());
  article(app, new ArticleService(mockDB), new CommentService(mockDB));
  return app;
};

// article

describe(`API returns a list of all articles`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 6 articles`, () => expect(response.body.length).toBe(6));

  test(`First article's title equals "Самый лучший музыкальный альбом этого года"`, () => expect(response.body[0].title).toBe(`Самый лучший музыкальный альбом этого года`));

});

describe(`API returns an article with given id`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`/articles/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article's title is "Самый лучший музыкальный альбом этого года"`, () => expect(response.body.title).toBe(`Самый лучший музыкальный альбом этого года`));

});

describe(`API creates an article if data is valid`, () => {
  let app;
  let response;

  const newArticle = {
    title: `Скоро выйдет новый альбом Земфиры`,
    announce: `Обзор новой пластинки знаменитой певицы`,
    categories: [1],
    text: `На альбоме огромное количество классных песен. Красивые стихи. Прекрасная музыка.`,
    date: `2020-10-11`,
  };

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).post(`/articles`).send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns article created`, () => expect(response.body.title).toBe(`Скоро выйдет новый альбом Земфиры`));

  test(`Articles count is changed`, () => request(app).get(`/articles`).expect((res) => expect(res.body.length).toBe(7))
  );

});

describe(`API refuses to create an article if data is invalid`, () => {
  let app;

  const newArticle = {
    title: `Новый альбом Земфиры`,
    announce: `Обзор новой пластинки знаменитой певицы`,
    category: [1],
  };

  beforeAll(async () => {
    app = await createAPI();
  });

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badOffer = {...newArticle};
      delete badOffer[key];
      await request(app).post(`/articles`).send(badOffer).expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent article`, () => {
  let app;
  let response;

  const newArticle = {
    title: `Скоро выйдет новый альбом Земфиры`,
    announce: `Обзор новой пластинки знаменитой певицы`,
    categories: [1],
    text: `На альбоме огромное количество классных песен. Красивые стихи. Прекрасная музыка.`,
    date: `2021-01-01`,
  };

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).put(`/articles/1`).send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer is really changed`, () => request(app).get(`/articles/1`).expect((res) => expect(res.body.title).toBe(`Скоро выйдет новый альбом Земфиры`))
  );

});

describe(`API NOT changes non-existent article`, () => {
  let app;
  let response;

  const validArticle = {
    title: `Скоро выйдет новый альбом Земфиры`,
    announce: `Обзор новой пластинки знаменитой певицы`,
    categories: [1],
    text: `На альбоме огромное количество классных песен. Красивые стихи. Прекрасная музыка.`,
    date: `2020-01-02`,
  };

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).put(`/articles/123456789`).send(validArticle);
  });

  test(`Status code 404`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));
});

describe(`API NOT change an article with invalid data`, () => {
  let app;
  let response;

  const invalidArticle = {
    title: `Новый альбом Земфиры`,
    category: [1],
    text: `На альбоме огромное количество классных песен. Красивые стихи. Прекрасная музыка.`
  };

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).put(`/articles/NULL`).send(invalidArticle);
  });

  test(`Status code 400`, () => expect(response.statusCode).toBe(HttpCode.BAD_REQUEST));
});

describe(`API correctly deletes an article`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).delete(`/articles/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article count is 5 now`, () => request(app).get(`/articles`).expect((res) => expect(res.body.length).toBe(5))
  );

});

describe(`API NOT delete non-existent article`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).delete(`/articles/123456789`);
  });

  test(`Status code 404`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));
});


// comments

describe(`API returns a list of comments to given article`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`/articles/2/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 2 comments`, () => expect(response.body.length).toBe(2));

  test(`First comment's text is "Это где ж такие красоты?"`, () => expect(response.body[0].text).toBe(`Это где ж такие красоты?`));

});

describe(`API creates a comment if data is valid`, () => {
  let app;
  let response;

  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).post(`/articles/2/comments`).send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () => request(app).get(`/articles/2/comments`).expect((res) => expect(res.body.length).toBe(3))
  );

});

describe(`API refuses to create a comment to non-existent article`, () => {
  let app;
  let response;

  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).post(`/articles/123456789/comments`).send(newComment);
  });

  test(`Status code 404`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));
});

describe(`API refuses to create a comment when data is invalid`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).post(`/articles/1/comments`).send({});
  });

  test(`Status code 400`, () => expect(response.statusCode).toBe(HttpCode.BAD_REQUEST));
});

describe(`API correctly deletes a comment`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).delete(`/articles/2/comments/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Comments count is 1 now`, () => request(app)
    .get(`/articles/2/comments`)
    .expect((res) => expect(res.body.length).toBe(1))
  );

});

describe(`API refuses to delete non-existent comment`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).delete(`/articles/2/comments/11`);
  });

  test(`Status code 404`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));
});

describe(`API refuses to delete a comment to non-existent article`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).delete(`/articles/123456789/comments/11`);
  });

  test(`Status code 404`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));
});

