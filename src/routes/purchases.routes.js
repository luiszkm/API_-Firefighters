const{ Router} = require("express");

const PurchasesController = require("../controllers/PurchasesController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const admAuthenticated = require("../middleware/admAuthenticated");

const purchasesRouter = Router()

const purchasesController = new PurchasesController()

purchasesRouter.post("/",ensureAuthenticated,purchasesController.create)
purchasesRouter.get("/",admAuthenticated,purchasesController.show)

module.exports = purchasesRouter;