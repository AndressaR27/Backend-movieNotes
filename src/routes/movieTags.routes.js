const { Router } = require("express");

const MovieTagsRoutes = Router();

const MovieTagsController = require("../Controllers/MovieTagsController");
const movieTagsController = new MovieTagsController();

MovieTagsRoutes.get("/:user_id", movieTagsController.index);


module.exports = MovieTagsRoutes;