const { Router } = require("express")

const MovieNotesRoutes = Router();

const MovieNotesController = require("../Controllers/MovieNotesController")
const movieNotesController = new MovieNotesController();

MovieNotesRoutes.post("/:user_id", movieNotesController.create);
MovieNotesRoutes.get("/:id", movieNotesController.show);
MovieNotesRoutes.delete("/:id", movieNotesController.delete);
MovieNotesRoutes.get("/", movieNotesController.index);

module.exports = MovieNotesRoutes;

