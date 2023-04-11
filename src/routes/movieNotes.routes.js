const { Router } = require("express")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const MovieNotesRoutes = Router();

const MovieNotesController = require("../Controllers/MovieNotesController")
const movieNotesController = new MovieNotesController();

MovieNotesRoutes.use(ensureAuthenticated);

MovieNotesRoutes.post("/", movieNotesController.create);
MovieNotesRoutes.get("/:id", movieNotesController.show); // é o ID da nota
MovieNotesRoutes.delete("/:id", movieNotesController.delete); // é o ID da nota
MovieNotesRoutes.get("/", movieNotesController.index);


module.exports = MovieNotesRoutes;

