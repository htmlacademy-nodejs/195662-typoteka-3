'use strict';

const chalk = require(`chalk`);
const {getRandomInt, shuffle, writeFile, readContent} = require(`../../utils`);
const {FileExtension} = require(`../../constants`);
const GenerateSql = require(`../lib/generate-sql`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const MAX_COMMENTS = 10;
const FILE_NAME = `fill-db-generated.sql`;

const FILE_USERS_PATH = `./data/users.json`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const usersFields = [
  `email`,
  `firstname`,
  `lastname`,
  `password`,
  `avatar`,
];
const categoriesFields = [
  `title`,
];
const articlesFields = [
  `title`,
  `picture`,
  `announce`,
  `text`,
  `user_id`,
];
const articlesCategoriesFields = [
  `article_id`,
  `category_id`,
];
const commentsFields = [
  `article_id`,
  `user_id`,
  `text`,
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
    text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `),
  }))
);
const generateCategories = (categoriesCount) => {
  const categories = new Set(Array(getRandomInt(1, 4)).fill(0).map(() => getRandomInt(1, categoriesCount)));
  return Array.from(categories);
};
const generateArticles = (count, usersCount, titles, categoriesCount, sentences, comments) => {
  return Array(count).fill({}).map((_, index) => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: generatePicture(getRandomInt(1, 3)),
    announce: shuffle(sentences).slice(0, getRandomInt(1, 5)).join(` `),
    text: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
    userId: getRandomInt(1, usersCount),
    date: generateDate(),
    categories: generateCategories(categoriesCount),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), index + 1, usersCount, comments),
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

    const users = await readContent(FILE_USERS_PATH, FileExtension.JSON);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const commentSentences = await readContent(FILE_COMMENTS_PATH);

    const articlesSource = generateArticles(countArticles, users.length, titles, categories.length, sentences, commentSentences);

    const articles = articlesSource.map(({title, picture, announce, text, userId}) => {
      return {
        title,
        picture,
        announce,
        text,
        userId,
      };
    });
    const articlesCategories = generateArticlesCategories(articlesSource);
    const comments = articlesSource.flatMap((article) => article.comments);

    const generateSql = new GenerateSql();

    generateSql.addComment(`Заполнение таблицы users`);
    generateSql.addInsert(`users`, usersFields, users);
    generateSql.addComment(`Заполнение таблицы categories`);
    generateSql.addInsert(`categories`, categoriesFields, categories);
    generateSql.addComment(`Заполнение таблицы articles`);
    generateSql.disabledTriggers(`articles`);
    generateSql.addInsert(`articles`, articlesFields, articles);
    generateSql.enabledTrigger(`articles`);
    generateSql.addComment(`Заполнение таблицы articles_categories`);
    generateSql.disabledTriggers(`articles_categories`);
    generateSql.addInsert(`articles_categories`, articlesCategoriesFields, articlesCategories);
    generateSql.enabledTrigger(`articles_categories`);
    generateSql.addComment(`Заполнение таблицы comments`);
    generateSql.disabledTriggers(`comments`);
    generateSql.addInsert(`comments`, commentsFields, comments);
    generateSql.enabledTrigger(`comments`);

    const content = generateSql.compile();
    await writeFile(FILE_NAME, content);
  }
};
