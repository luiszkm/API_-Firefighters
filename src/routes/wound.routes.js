const {Router} = require("express")

const WoundController = require("../controllers/WoundController")

const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const woundRoutes = Router()

const  woundController = new WoundController()

woundRoutes.get('/',ensureAuthenticated, woundController.index)

module.exports = woundRoutes