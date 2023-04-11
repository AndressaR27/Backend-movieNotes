const { Router } = require("express")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER) //Inicializando o Multer e passando as configurações

const UsersController = require("../Controllers/UsersController")
const usersController = new UsersController();
const UserAvatarController = require("../Controllers/UserAvatarController")
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update); // put - atualizar mais de 1 campo
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update) // single pq vai carregar um arquivo só, e "avatar" é o nome do campo que vai trazer esse arquivo

module.exports = usersRoutes;