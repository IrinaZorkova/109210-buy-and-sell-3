'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {FILE_NAME} = require(`./constants`);

module.exports.getRandomInt = (min, max) => {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor(Math.random() * (_max - _min + 1)) + _min;
};

module.exports.shuffle = (array) => {
  const _array = [...array];

  for (let i = _array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [_array[i], _array[randomPosition]] = [_array[randomPosition], _array[i]];
  }

  return array;
};

module.exports.getPictureFileName = (id) => {
  const _id = id < 10 ? `0${id}` : id;
  return `item${_id}.jpg`;
};

module.exports.writeFile = async (content) => {
  try {
    await fs.writeFile(FILE_NAME, content);
    console.log(chalk.green(`Operation success. File created.`));
  } catch (err) {
    console.error(chalk.red(`Can't write data to file...`));
  }
};
