const { Router } = require("express")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const usersRoutes = Router();

const UsersController = require("../Controllers/UsersController")
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);

module.exports = usersRoutes;