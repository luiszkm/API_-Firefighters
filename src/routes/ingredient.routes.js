const{ Router} = require("express");
const multer = require("multer");

const uploadConfig = require("../config/upload");

const upload = multer(uploadConfig.MULTER)

const IngredientController = require("../controllers/IngredientController")

const ingredientRouter = Router()

const ingredientController = new IngredientController()

ingredientRouter.get("/:product_id",ingredientController.index)

ingredientRouter.post("/",upload.single("image"),ingredientController.create)


module.exports = ingredientRouter;