const {Router} = require("express")

const ProceduresController = require("../controllers/ProceduresController")

const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const proceduresRoutes = Router()

const  proceduresController = new ProceduresController()

proceduresRoutes.get('/',ensureAuthenticated, proceduresController.index)

module.exports = proceduresRoutes