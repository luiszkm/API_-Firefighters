const {Router} = require("express")

const TraumasController = require("../controllers/TraumasController")

const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const traumasRoutes = Router()

const  traumasController = new TraumasController()

traumasRoutes.get('/',ensureAuthenticated, traumasController.show)

module.exports = traumasRoutes