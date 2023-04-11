const { Router } = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const MovieTagsRoutes = Router();

const MovieTagsController = require("../Controllers/MovieTagsController");
const movieTagsController = new MovieTagsController();

MovieTagsRoutes.get("/", ensureAuthenticated, movieTagsController.index);


module.exports = MovieTagsRoutes;