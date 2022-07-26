//arquivo index = reuniar todas as rotas da aplicação

const { Router } = require("express");

const usersRouter = require("./users.routes")
const movieNotesRouter = require("./movieNotes.routes")
const movieTagsRouter = require("./movieTags.routes")

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movie_notes", movieNotesRouter);
routes.use("/movie_tags", movieTagsRouter);

module.exports = routes;

