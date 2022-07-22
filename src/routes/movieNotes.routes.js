const { Router } = require("express")

const MovieNotesRoutes = Router();

const MovieNotesController = require("../Controllers/MovieNotesController")
const movieNotesController = new MovieNotesController();

MovieNotesRoutes.post("/:user_id", movieNotesController.create);


module.exports = MovieNotesRoutes;