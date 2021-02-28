'use strict';

const express = require(`express`);
const routes = require(`../api`);
const {getLogger} = require(`../lib/logger`);
const {HttpCode, API_PREFIX} = require(`../../constants`);

const DEFAULT_PORT = 3000;

const app = express();
const logger = getLogger({name: `api`});

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
          return logger.error(`An error occured on server creation: ${error.message}`);
        }
        return logger.info(`Listening to connections on ${port}`);
      });
    } catch (error) {
      logger.error(`An error occured: ${error.message}`);
      process.exit(1);
    }


  }
};
