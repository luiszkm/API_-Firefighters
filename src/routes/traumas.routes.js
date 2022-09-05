const {Router} = require("express")

const ClinicalController = require("../controllers/ClinicalController")

const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const clinicalRoutes = Router()

const  clinicalController = new ClinicalController()

clinicalRoutes.get('/',ensureAuthenticated, clinicalController.index)

module.exports = clinicalRoutes