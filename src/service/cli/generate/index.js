'use strict';

const {getRandomInt, shuffle, getPictureFileName, writeFile} = require(`./helpers`);
const {CATEGORIES, SumRestrict, DEFAULT_COUNT, TITLES, OfferType, SENTENCES, PictureIdRestrict, MAX_ADVERTS_COUNT} = require(`./constants`);
const {ExitCode} = require(`../../../constants`);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const advertsCount = count && count > 0 ? parseInt(count, 10) : DEFAULT_COUNT;

    if (advertsCount > MAX_ADVERTS_COUNT) {
      console.error(`Не больше 1000 объявлений`);
      process.exit(ExitCode.ERROR);
    }

    const content = JSON.stringify(generateOffers(advertsCount));
    writeFile(content);
  }
};

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    picture: getPictureFileName(getRandomInt(PictureIdRestrict.MIN, PictureIdRestrict.MAX)),
    type: Object.values(OfferType)[getRandomInt(0, Object.keys(OfferType).length - 1)],
    description: shuffle(SENTENCES).slice(0, getRandomInt(1, 5)).join(` `),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length))
  }))
);
