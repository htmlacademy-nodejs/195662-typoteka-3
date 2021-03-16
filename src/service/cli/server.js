'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const routes = require(`../api`);
const {HttpCode, API_PREFIX} = require(`../../constants`);

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());
app.use(API_PREFIX, routes);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    try {
      app.listen(port, (error) => {
        if (error) {
          return console.error(`Ошибка при создании сервера`, error);
        }
        return console.info(chalk.green(`Ожидаю соединений на ${port}`));
      });
    } catch (error) {
      console.error(`Произошла ошибка: ${error.message}`);
      process.exit(1);
    }


  }
};
