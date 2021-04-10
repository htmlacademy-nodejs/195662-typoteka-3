'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {FileExtension} = require(`./constants`);

const writeFile = async (fileName, content) => {
  try {
    await fs.writeFile(fileName, content);
    console.info(chalk.green(`Operation success. File created.`));
  } catch (err) {
    console.error(chalk.red(`Can't write data to file...`));
    throw err;
  }
};

module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }
  return someArray;
};

module.exports.writeFile = writeFile;

module.exports.writeJsonFile = async (fileName, content) => {
  content = JSON.stringify(content);
  await writeFile(fileName, content);
};

module.exports.readContent = async (filePath, fileExtension) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    if (fileExtension === FileExtension.JSON) {
      return JSON.parse(content);
    }
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};
