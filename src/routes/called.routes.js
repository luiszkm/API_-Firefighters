const {Router} = require("express")
const CalledController = require("../controllers/CalledController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")
const admAuthenticated = require("../middleware/admAuthenticated")

const calledRoutes = Router()

const  callerController = new CalledController()


calledRoutes.get('/',ensureAuthenticated, callerController.index)
calledRoutes.post('/',ensureAuthenticated ,callerController.create)
calledRoutes.get('/:id',ensureAuthenticated, callerController.show)
calledRoutes.put('/:id',admAuthenticated, callerController.update)
calledRoutes.delete('/:id',admAuthenticated, callerController.delete)

module.exports = calledRoutes