const {Router} = require("express")

const UsedMaterialController = require("../controllers/UsedMaterialController")

const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const usedMaterialRoutes = Router()

const  usedMaterialController = new UsedMaterialController()

usedMaterialRoutes.get('/',ensureAuthenticated, usedMaterialController.index)

module.exports = usedMaterialRoutes