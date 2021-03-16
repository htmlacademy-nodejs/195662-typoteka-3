'use strict';

const express = require(`express`);
const request = require(`supertest`);
const article = require(`./article`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);
const {HttpCode} = require(`../../constants`);
const mockData = [
  {
    "id": `FruOPx`,
    "title": `Обзор новейшего смартфона`,
    "date": `2021-02-08T10:47:33.146Z`,
    "announce": `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Ёлки — это не просто красивое дерево. Это прочная древесина. Достичь успеха помогут ежедневные повторения. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    "fullText": `Из под его пера вышло 8 платиновых альбомов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Программировать не настолько сложно, как об этом говорят. Собрать камни бесконечности легко, если вы прирожденный герой. Это один из лучших рок-музыкантов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    "category": [
      `IT`
    ],
    "comments": [
      {
        "id": `DXfWS1`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `m6QqPc`,
        "text": `Это где ж такие красоты? Совсем немного... Согласен с автором!`
      },
      {
        "id": `TETE1H`,
        "text": `Плюсую, но слишком много буквы!`
      },
      {
        "id": `tjmns9`,
        "text": `Совсем немного... Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Плюсую, но слишком много буквы!`
      }
    ]
  },
  {
    "id": `46PssH`,
    "title": `Что такое золотое сечение`,
    "date": `2021-01-25T15:23:49.468Z`,
    "announce": `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    "fullText": `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Достичь успеха помогут ежедневные повторения. Из под его пера вышло 8 платиновых альбомов. Программировать не настолько сложно, как об этом говорят. Он написал больше 30 хитов. Ёлки — это не просто красивое дерево. Это прочная древесина. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Как начать действовать? Для начала просто соберитесь. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    "category": [
      `Кино`,
      `Деревья`,
      `Программирование`,
      `IT`,
      `Разное`,
      `Музыка`,
      `Без рамки`,
      `Железо`
    ],
    "comments": [
      {
        "id": `Aai3pY`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-) Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        "id": `IjOV3K`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором!`
      },
      {
        "id": `W-Ljd1`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `Vxe5_0`,
        "text": `Совсем немного... Это где ж такие красоты?`
      },
      {
        "id": `hjNkbV`,
        "text": `Плюсую, но слишком много буквы!`
      },
      {
        "id": `zVABDE`,
        "text": `Согласен с автором!`
      }
    ]
  },
  {
    "id": `RREmN0`,
    "title": `Что такое золотое сечение`,
    "date": `2020-11-30T09:05:49.351Z`,
    "announce": `Первая большая ёлка была установлена только в 1938 году. Программировать не настолько сложно, как об этом говорят. Это один из лучших рок-музыкантов.`,
    "fullText": `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Собрать камни бесконечности легко, если вы прирожденный герой. Достичь успеха помогут ежедневные повторения. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Он написал больше 30 хитов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    "category": [
      `Железо`,
      `Кино`
    ],
    "comments": [
      {
        "id": `DmaYlo`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `gRouQ_`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        "id": `R1m2Ow`,
        "text": `Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `YPyexs`,
        "text": `Мне кажется или я уже читал это где-то? Планируете записать видосик на эту тему? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        "id": `85QdyG`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы!`
      },
      {
        "id": `ASrj1g`,
        "text": `Совсем немного... Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы!`
      },
      {
        "id": `dz8cQh`,
        "text": `Мне кажется или я уже читал это где-то? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `ln-Xd3`,
        "text": `Планируете записать видосик на эту тему? Плюсую, но слишком много буквы!`
      },
      {
        "id": `Bww9DI`,
        "text": `Хочу такую же футболку :-) Совсем немного... Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `GOQmPg`,
        "text": `Планируете записать видосик на эту тему?`
      }
    ]
  },
  {
    "id": `Ddom1l`,
    "title": `Как начать программировать`,
    "date": `2020-12-23T10:16:13.117Z`,
    "announce": `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Золотое сечение — соотношение двух величин, гармоническая пропорция. Достичь успеха помогут ежедневные повторения.`,
    "fullText": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Из под его пера вышло 8 платиновых альбомов. Программировать не настолько сложно, как об этом говорят. Он написал больше 30 хитов. Как начать действовать? Для начала просто соберитесь. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Простые ежедневные упражнения помогут достичь успеха.`,
    "category": [
      `Разное`,
      `Без рамки`,
      `Деревья`,
      `Железо`,
      `Кино`,
      `IT`,
      `Программирование`
    ],
    "comments": [
      {
        "id": `TcliXt`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного...`
      },
      {
        "id": `UHYtc5`,
        "text": `Это где ж такие красоты?`
      },
      {
        "id": `e_LeiO`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        "id": `SEULsq`,
        "text": `Согласен с автором! Плюсую, но слишком много буквы!`
      },
      {
        "id": `68psQJ`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `dTQ25D`,
        "text": `Согласен с автором!`
      },
      {
        "id": `TRh38z`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `XRizwO`,
        "text": `Совсем немного...`
      },
      {
        "id": `M2ja3S`,
        "text": `Хочу такую же футболку :-)`
      }
    ]
  },
  {
    "id": `PNiVRZ`,
    "title": `Как перестать беспокоиться и начать жить`,
    "date": `2020-12-16T16:19:31.811Z`,
    "announce": `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Как начать действовать? Для начала просто соберитесь. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    "fullText": `Программировать не настолько сложно, как об этом говорят. Из под его пера вышло 8 платиновых альбомов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха. Первая большая ёлка была установлена только в 1938 году. Достичь успеха помогут ежедневные повторения. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Как начать действовать? Для начала просто соберитесь. Он написал больше 30 хитов. Ёлки — это не просто красивое дерево. Это прочная древесина. Золотое сечение — соотношение двух величин, гармоническая пропорция. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Это один из лучших рок-музыкантов. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    "category": [
      `Без рамки`,
      `За жизнь`,
      `Железо`,
      `Кино`
    ],
    "comments": [
      {
        "id": `ln-DT5`,
        "text": `Согласен с автором! Планируете записать видосик на эту тему?`
      },
      {
        "id": `2M3y7J`,
        "text": `Плюсую, но слишком много буквы!`
      },
      {
        "id": `NiTNpn`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `8RHIG8`,
        "text": `Это где ж такие красоты? Хочу такую же футболку :-)`
      },
      {
        "id": `y41m9q`,
        "text": `Планируете записать видосик на эту тему? Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  article(app, new ArticleService(cloneData), new CommentService());
  return app;
};

// article

describe(`API returns a list of all articles`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 5 articles`, () => expect(response.body.length).toBe(5));

  test(`First article's id equals "FruOPx"`, () => expect(response.body[0].id).toBe(`FruOPx`));

});

describe(`API returns an article with given id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/Ddom1l`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article's title is "Как начать программировать"`, () => expect(response.body.title).toBe(`Как начать программировать`));

});

describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    title: `Новый альбом Земфиры`,
    date: `2021-02-27`,
    announce: `Обзор новой пластинки знаменитой певицы`,
    category: [`Музыка`],
    fullText: `На альбоме огромное количество классных песен. Красивые стихи. Прекрасная музыка.`
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).post(`/articles`).send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Articles count is changed`, () => request(app).get(`/articles`).expect((res) => expect(res.body.length).toBe(6))
  );

});

describe(`API refuses to create an article if data is invalid`, () => {

  const newArticle = {
    title: `Новый альбом Земфиры`,
    date: `2021-02-27`,
    announce: `Обзор новой пластинки знаменитой певицы`,
    category: [`Музыка`],
  };

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badOffer = {...newArticle};
      delete badOffer[key];
      await request(app).post(`/articles`).send(badOffer).expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent article`, () => {

  const newArticle = {
    title: `Новый альбом Земфиры`,
    date: `2021-02-27`,
    announce: `Обзор новой пластинки знаменитой певицы`,
    category: [`Музыка`],
    fullText: `На альбоме огромное количество классных песен. Красивые стихи. Прекрасная музыка.`
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).put(`/articles/46PssH`).send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed offer`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Offer is really changed`, () => request(app).get(`/articles/46PssH`).expect((res) => expect(res.body.title).toBe(`Новый альбом Земфиры`))
  );

});

test(`API returns status code 404 when trying to change non-existent article`, () => {

  const app = createAPI();

  const validArticle = {
    title: `Новый альбом Земфиры`,
    date: `2021-02-27`,
    announce: `Обзор новой пластинки знаменитой певицы`,
    category: [`Музыка`],
    fullText: `На альбоме огромное количество классных песен. Красивые стихи. Прекрасная музыка.`
  };

  return request(app).put(`/articles/NOEXST`).send(validArticle).expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {

  const app = createAPI();

  const invalidArticle = {
    title: `Новый альбом Земфиры`,
    date: `2021-02-27`,
    category: [`Музыка`],
    fullText: `На альбоме огромное количество классных песен. Красивые стихи. Прекрасная музыка.`
  };

  return request(app).put(`/articles/NOEXST`).send(invalidArticle).expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/RREmN0`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`RREmN0`));

  test(`Article count is 4 now`, () => request(app).get(`/articles`).expect((res) => expect(res.body.length).toBe(4))
  );

});

test(`API refuses to delete non-existent article`, () => {

  const app = createAPI();

  return request(app).delete(`/articles/NOEXST`).expect(HttpCode.NOT_FOUND);

});

// comments

describe(`API returns a list of comments to given article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/FruOPx/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 4 comments`, () => expect(response.body.length).toBe(4));

  test(`First comment's id is "DXfWS1"`, () => expect(response.body[0].id).toBe(`DXfWS1`));

});

describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).post(`/articles/FruOPx/comments`).send(newComment);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () => request(app).get(`/articles/FruOPx/comments`).expect((res) => expect(res.body.length).toBe(5))
  );

});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/FruOPx/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);

});

describe(`API correctly deletes a comment`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/FruOPx/comments/DXfWS1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns comment deleted`, () => expect(response.body.id).toBe(`DXfWS1`));

  test(`Comments count is 3 now`, () => request(app)
    .get(`/articles/FruOPx/comments`)
    .expect((res) => expect(res.body.length).toBe(3))
  );

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app).delete(`/articles/FruOPx/comments/NOEXST`).expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete a comment to non-existent article`, () => {

  const app = createAPI();

  return request(app).delete(`/offers/NOEXST/comments/DXfWS1`).expect(HttpCode.NOT_FOUND);

});
