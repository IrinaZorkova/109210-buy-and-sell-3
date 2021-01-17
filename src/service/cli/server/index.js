'use strict';

const {offersController} = require(`./offers.controller`);
const {Router} = require(`express`);
const router = new Router();
const {DEFAULT_PORT} = require(`../../../constants`);

const express = require(`express`);

const app = express();

router.get(`/offers`, offersController);

module.exports = {
  name: `--server`,
  run: (args) => {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, () => {
      console.log(`Сервер принимает подключения на ${port}`);
    });

    app.use(express.json());

    app.use(router);
  }
};
