'use strict';

const chalk = require(`chalk`);
const path = require(`path`);
const {getRandomInt, shuffle, getPictureFileName, writeFile, readFile} = require(`./helpers`);
const {SumRestrict, DEFAULT_COUNT, OfferType, PictureIdRestrict, MAX_ADVERTS_COUNT} = require(`./constants`);
const {ExitCode} = require(`../../../constants`);

const FILE_SENTENCES_PATH = path.resolve(`data/sentences.txt`);
const FILE_TITLES_PATH = path.resolve(`data/titles.txt`);
const FILE_CATEGORIES_PATH = path.resolve(`data/categories.txt`);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const advertsCount = count && count > 0 ? parseInt(count, 10) : DEFAULT_COUNT;

    if (advertsCount > MAX_ADVERTS_COUNT) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.ERROR);
    }

    const sentences = await readFile(FILE_SENTENCES_PATH);
    const titles = await readFile(FILE_TITLES_PATH);
    const categories = await readFile(FILE_CATEGORIES_PATH);

    const content = JSON.stringify(generateOffers(advertsCount, titles, categories, sentences));
    await writeFile(content);
  }
};

const generateOffers = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    picture: getPictureFileName(getRandomInt(PictureIdRestrict.MIN, PictureIdRestrict.MAX)),
    type: Object.values(OfferType)[getRandomInt(0, Object.keys(OfferType).length - 1)],
    description: shuffle(sentences).slice(0, getRandomInt(1, 5)).join(` `),
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length))
  }))
);
