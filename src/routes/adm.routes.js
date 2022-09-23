const {Router} = require("express")
const AdmController = require("../controllers/AdmController")
const admAuthenticated = require("../middleware/admAuthenticated")

const ensureAuthenticated = require("../middleware/ensureAuthenticated")


const admRouter = Router()

const  admController = new AdmController()

admRouter.use(admAuthenticated)
admRouter.put("/userUpdate/:id", admController.updateAdm)

admRouter.get('/called', admController.show)
admRouter.get('/search', admController.index)

admRouter.get('/', admController.showUsers)
admRouter.get('/:id', admController.showUser)

module.exports = admRouter