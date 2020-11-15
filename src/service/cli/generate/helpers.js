'use strict';

const fs = require(`fs`);
const {FILE_NAME} = require(`./constants`);

module.exports.getRandomInt = (_min, _max) => {
  const min = Math.ceil(_min);
  const max = Math.floor(_max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.shuffle = (_array) => {
  const array = [..._array];

  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
  }

  return array;
};

module.exports.getPictureFileName = (_id) => {
  const id = _id < 10 ? `0${_id}` : _id;
  return `item${id}.jpg`;
};

module.exports.writeFile = (content) => {
  fs.writeFile(FILE_NAME, content, (err) => {
    if (err) {
      return console.error(`Can't write data to file...`);
    }

    return console.info(`Operation success. File created.`);
  });
};
