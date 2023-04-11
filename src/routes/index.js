//arquivo index = reuniar todas as rotas da aplicação

const { Router } = require("express");

const sessionsRouter = require("./sessions.routes")
const usersRouter = require("./users.routes")
const movieNotesRouter = require("./movieNotes.routes")
const movieTagsRouter = require("./movieTags.routes")
const databaseListRouter = require("./databaseList.routes")

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/movie_notes", movieNotesRouter);
routes.use("/movie_tags", movieTagsRouter);
routes.use("/databaseList", databaseListRouter);

module.exports = routes;

