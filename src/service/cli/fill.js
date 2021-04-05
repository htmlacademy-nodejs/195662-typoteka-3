'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {getRandomInt, shuffle} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const MAX_COMMENTS = 10;
const FILE_NAME = `fill-db-generated.sql`;

const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const users = [
  {
    email: `ivanov@example.com`,
    firstName: `Иван`,
    lastName: `Иванов`,
    password: `5f4dcc3b5aa765d61d8327deb882cf99`,
    avatar: `avatar1.jpg`
  },
  {
    email: `petrov@example.com`,
    firstName: `Пётр`,
    lastName: `Петров`,
    password: `5f4dcc3b5aa765d61d8327deb882cf99`,
    avatar: `avatar2.jpg`
  }
];

const generateDate = () => {
  const to = new Date();
  const from = new Date();
  from.setMonth(to.getMonth() - 3);
  return new Date(from.getTime() + Math.random() * (to - from));
};
const generatePicture = (number) => (`image0${number}.jpg`);
const generateComments = (count, articleId, userCount, comments) => (
  Array(count).fill({}).map(() => ({
    articleId,
    userId: getRandomInt(1, userCount),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);
const generateCategories = (categoriesCount) => {
  const categories = new Set(Array(getRandomInt(1, 4)).fill(0).map(() => getRandomInt(1, categoriesCount)));
  return Array.from(categories);
};
const generateArticles = (count, usersCount, titles, categoriesCount, sentences, comments) => {
  return Array(count).fill({}).map((_, index) => ({
    userId: getRandomInt(1, usersCount),
    title: titles[getRandomInt(0, titles.length - 1)],
    date: generateDate(),
    announce: shuffle(sentences).slice(0, getRandomInt(1, 5)).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
    categories: generateCategories(categoriesCount),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), index + 1, usersCount, comments),
    picture: generatePicture(getRandomInt(1, 3)),
  }));
};

const generateArticlesCategories = (articles) => {
  const articlesCategories = [];
  articles.forEach((article, articleIndex) => {
    article.categories.forEach((categoryId) => {
      articlesCategories.push({
        articleId: articleIndex + 1,
        categoryId,
      });
    });
  });
  return articlesCategories;
};

module.exports = {
  name: `--fill`,
  async run(args) {
    const [count] = args;
    const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countArticles > MAX_COUNT) {
      console.error(chalk.red(`Не больше 1000 публикаций`));
      return;
    }

    const categories = await readContent(FILE_CATEGORIES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const commentSentences = await readContent(FILE_COMMENTS_PATH);

    const articles = generateArticles(countArticles, users.length, titles, categories.length, sentences, commentSentences);
    const comments = articles.flatMap((offer) => offer.comments);
    const articlesCategories = generateArticlesCategories(articles);

    const usersValues = users.map(
        ({
          email,
          firstName,
          lastName,
          password,
          avatar
        }) => {
          return `('${email}', '${firstName}', '${lastName}', '${password}', '${avatar}')`;
        }).join(`,\n`);


    const categoriesValues = categories.map((title) => `('${title}')`).join(`,\n`);

    const articlesValues = articles.map(
        ({
          title,
          picture,
          announce,
          fullText,
          userId
        }) => {
          return `('${title}', '${picture}', '${announce}', '${fullText}', ${userId})`;
        }).join(`,\n`);

    const articlesCategoriesValues = articlesCategories.map(
        ({
          articleId,
          categoryId,
        }) => {
          return `(${articleId}, ${categoryId})`;
        }).join(`,\n`);

    const commentsValues = comments.map(
        ({
          articleId,
          userId,
          text,
        }) => {
          return `('${text}', ${userId}, ${articleId})`;
        }).join(`,\n`);

    const content = (`
      /*Заполнение таблицы users*/
      INSERT INTO users(email, firstname, lastname, password, avatar) VALUES
      ${usersValues};

      /*Заполнение таблицы categories*/
      INSERT INTO categories(title) VALUES
      ${categoriesValues};

      /*Заполнение таблицы articles*/
      ALTER TABLE articles DISABLE TRIGGER ALL;
      INSERT INTO articles(title, picture, announce, text, user_id) VALUES
      ${articlesValues};
      ALTER TABLE articles ENABLE TRIGGER ALL;

      /*Заполнение таблицы articles_categories*/
      ALTER TABLE articles_categories DISABLE TRIGGER ALL;
      INSERT INTO articles_categories(article_id, category_id) VALUES
      ${articlesCategoriesValues};
      ALTER TABLE articles_categories ENABLE TRIGGER ALL;

      /*Заполнение таблицы comments*/
      ALTER TABLE comments DISABLE TRIGGER ALL;
      INSERT INTO comments(text, user_id, article_id) VALUES
      ${commentsValues};
      ALTER TABLE comments ENABLE TRIGGER ALL;`
    );

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
