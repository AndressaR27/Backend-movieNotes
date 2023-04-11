const { Router } = require("express")

const DatabaseListRoutes = Router();

const DatabaseListController = require("../Controllers/DatabaseListController")
const databaseListController = new DatabaseListController();


DatabaseListRoutes.get("/", databaseListController.allList);

module.exports = DatabaseListRoutes;
