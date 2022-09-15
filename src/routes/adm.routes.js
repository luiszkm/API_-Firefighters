const {Router} = require("express")
const AdmController = require("../controllers/AdmController")
const admAuthenticated = require("../middleware/admAuthenticated")

const ensureAuthenticated = require("../middleware/ensureAuthenticated")


const admRouter = Router()

const  admController = new AdmController()

admRouter.use(ensureAuthenticated)

admRouter.get('/', admController.show)

module.exports = admRouter