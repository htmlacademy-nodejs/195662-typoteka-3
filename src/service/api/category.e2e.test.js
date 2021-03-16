'use strict';

const express = require(`express`);
const request = require(`supertest`);
const category = require(`./category`);
const DataService = require(`../data-service/category`);
const {HttpCode} = require(`../../constants`);
const mockData = [
  {
    "id": `1bU6lg`,
    "title": `Самый лучший музыкальный альбом этого года`,
    "date": `2020-12-16T01:15:33.167Z`,
    "announce": `Как начать действовать? Для начала просто соберитесь. Программировать не настолько сложно, как об этом говорят. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    "fullText": `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Достичь успеха помогут ежедневные повторения. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Как начать действовать? Для начала просто соберитесь. Собрать камни бесконечности легко, если вы прирожденный герой. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Ёлки — это не просто красивое дерево. Это прочная древесина. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Первая большая ёлка была установлена только в 1938 году. Это один из лучших рок-музыкантов. Он написал больше 30 хитов.`,
    "categories": [
      `Музыка`,
      `Кино`,
      `Железо`,
      `IT`
    ],
    "comments": [
      {
        "id": `DM8dOM`,
        "text": `Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-)`
      },
      {
        "id": `rCIelT`,
        "text": `Плюсую, но слишком много буквы!`
      },
      {
        "id": `GxPA5U`,
        "text": `Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты?`
      },
      {
        "id": `USenCU`,
        "text": `Мне кажется или я уже читал это где-то? Это где ж такие красоты? Совсем немного...`
      },
      {
        "id": `kT9krv`,
        "text": `Хочу такую же футболку :-) Планируете записать видосик на эту тему? Это где ж такие красоты?`
      }
    ]
  },
  {
    "id": `YHqgHT`,
    "title": `Как собрать камни бесконечности`,
    "date": `2021-01-16T03:05:56.828Z`,
    "announce": `Собрать камни бесконечности легко, если вы прирожденный герой. Он написал больше 30 хитов.`,
    "fullText": `Ёлки — это не просто красивое дерево. Это прочная древесина. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Он написал больше 30 хитов.`,
    "categories": [
      `Кино`
    ],
    "comments": [
      {
        "id": `aqgmbb`,
        "text": `Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `0To85D`,
        "text": `Это где ж такие красоты? Планируете записать видосик на эту тему?`
      },
      {
        "id": `PxsGrR`,
        "text": `Мне кажется или я уже читал это где-то? Совсем немного...`
      },
      {
        "id": `q4T8jD`,
        "text": `Хочу такую же футболку :-)`
      },
      {
        "id": `H9puwa`,
        "text": `Это где ж такие красоты?`
      },
      {
        "id": `v9YknE`,
        "text": `Хочу такую же футболку :-) Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Это где ж такие красоты?`
      },
      {
        "id": `8flLVH`,
        "text": `Совсем немного... Это где ж такие красоты?`
      },
      {
        "id": `O55rpZ`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного... Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `JpXJsx`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором! Планируете записать видосик на эту тему?`
      },
      {
        "id": `BxGvX5`,
        "text": `Плюсую, но слишком много буквы! Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      }
    ]
  },
  {
    "id": `AMd8G7`,
    "title": `Ёлки. История деревьев`,
    "date": `2021-01-16T07:40:53.690Z`,
    "announce": `Собрать камни бесконечности легко, если вы прирожденный герой. Достичь успеха помогут ежедневные повторения.`,
    "fullText": `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Собрать камни бесконечности легко, если вы прирожденный герой. Золотое сечение — соотношение двух величин, гармоническая пропорция. Ёлки — это не просто красивое дерево. Это прочная древесина. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Из под его пера вышло 8 платиновых альбомов. Это один из лучших рок-музыкантов. Он написал больше 30 хитов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Как начать действовать? Для начала просто соберитесь. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Первая большая ёлка была установлена только в 1938 году. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Программировать не настолько сложно, как об этом говорят. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Простые ежедневные упражнения помогут достичь успеха. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    "categories": [
      `За жизнь`
    ],
    "comments": [
      {
        "id": `Id1QpN`,
        "text": `Это где ж такие красоты?`
      },
      {
        "id": `P7Hhah`,
        "text": `Согласен с автором! Плюсую, но слишком много буквы! Планируете записать видосик на эту тему?`
      }
    ]
  },
  {
    "id": `XVwxkC`,
    "title": `Что такое золотое сечение`,
    "date": `2020-12-01T16:46:28.062Z`,
    "announce": `Простые ежедневные упражнения помогут достичь успеха. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Ёлки — это не просто красивое дерево. Это прочная древесина. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    "fullText": `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Собрать камни бесконечности легко, если вы прирожденный герой. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Достичь успеха помогут ежедневные повторения. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Первая большая ёлка была установлена только в 1938 году. Он написал больше 30 хитов.`,
    "categories": [
      `Без рамки`,
      `За жизнь`,
      `IT`,
      `Деревья`,
      `Музыка`,
      `Программирование`,
      `Кино`
    ],
    "comments": [
      {
        "id": `PjdFDj`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        "id": `NRhonW`,
        "text": `Это где ж такие красоты? Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `qi1yEW`,
        "text": `Плюсую, но слишком много буквы! Совсем немного... Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `SOjKpr`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты?`
      },
      {
        "id": `gLZfe7`,
        "text": `Согласен с автором!`
      },
      {
        "id": `jbc0lg`,
        "text": `Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты?`
      },
      {
        "id": `0FRrvv`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `gE3oMt`,
        "text": `Плюсую, но слишком много буквы!`
      },
      {
        "id": `md_NjH`,
        "text": `Хочу такую же футболку :-) Мне кажется или я уже читал это где-то?`
      }
    ]
  },
  {
    "id": `z2Jmhq`,
    "title": `Как собрать камни бесконечности`,
    "date": `2021-01-06T22:53:45.537Z`,
    "announce": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    "fullText": `Простые ежедневные упражнения помогут достичь успеха. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Собрать камни бесконечности легко, если вы прирожденный герой. Из под его пера вышло 8 платиновых альбомов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Первая большая ёлка была установлена только в 1938 году.`,
    "categories": [
      `Железо`
    ],
    "comments": [
      {
        "id": `UI42_W`,
        "text": `Это где ж такие красоты? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Совсем немного...`
      },
      {
        "id": `p9b7VZ`,
        "text": `Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `0o82-s`,
        "text": `Хочу такую же футболку :-) Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        "id": `qPoL7Q`,
        "text": `Это где ж такие красоты? Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `3CNf2Q`,
        "text": `Мне кажется или я уже читал это где-то? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `0CtcpI`,
        "text": `Плюсую, но слишком много буквы! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Совсем немного...`
      },
      {
        "id": `V3tS2O`,
        "text": `Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `2obbbd`,
        "text": `Совсем немного...`
      },
      {
        "id": `zbgQ0O`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?`
      }
    ]
  }
];

const app = express();
app.use(express.json());
category(app, new DataService(mockData));

describe(`API return category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 8 categories`, () => expect(response.body.length).toBe(8));

  test(`Category names are "Инструменты", "Животные", "Игры", "Журналы"`,
      () => expect(response.body).toEqual(
          expect.arrayContaining([`Музыка`, `Кино`, `Железо`, `IT`, `За жизнь`, `Без рамки`, `Деревья`, `Программирование`])
      )
  );

});
