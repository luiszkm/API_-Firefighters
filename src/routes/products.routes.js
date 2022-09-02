const{ Router} = require("express");
const multer = require("multer");
const uploadConfig = require("../config/upload");

const ProductsController = require("../controllers/ProductsController")
const admAuthenticated = require("../middleware/admAuthenticated");

const productsRouter = Router() 
const upload = multer(uploadConfig.MULTER)

const productsController = new ProductsController()


productsRouter.post("/",admAuthenticated,upload.single("image"),productsController.create)
productsRouter.put("/:id",admAuthenticated,upload.single("image"),productsController.update)

productsRouter.delete("/:id",productsController.delete)
productsRouter.get("/:id",productsController.show)
productsRouter.get("/",productsController.index)




module.exports = productsRouter;