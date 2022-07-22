//arquivo index = reuniar todas as rotas da aplicação

const { Router } = require("express");

const usersRouter = require("./users.routes")

const routes = Router();

routes.use("/users", usersRouter);

module.exports = routes;

