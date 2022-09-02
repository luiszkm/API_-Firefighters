const{ Router} = require("express");

const FavoritesController = require("../controllers/FavoritesController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const admAuthenticated = require("../middleware/admAuthenticated");

const favoritesRouter = Router()

const favoritesController = new FavoritesController()

favoritesRouter.post("/",ensureAuthenticated,favoritesController.create)
favoritesRouter.delete("/",ensureAuthenticated,favoritesController.delete)
favoritesRouter.get("/",admAuthenticated,favoritesController.show)

module.exports = favoritesRouter;