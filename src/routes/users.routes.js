const { Router } = require("express");

const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const multer = require("multer");
const uploadConfig = require("../config/upload");

const admAuthenticated = require("../middleware/admAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()

const userAvatarController = new UserAvatarController()

usersRoutes.post("/", usersController.create)

usersRoutes.put("/",ensureAuthenticated, usersController.update)
usersRoutes.patch("/avatar",ensureAuthenticated, upload.single("avatar"),userAvatarController.update)

usersRoutes.get("/called",ensureAuthenticated, usersController.showCalled)



module.exports = usersRoutes;