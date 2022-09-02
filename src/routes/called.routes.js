const {Router} = require("express")
const CalledController = require("../controllers/CalledController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const notesRoutes = Router()

const  callerController = new CalledController()

notesRoutes.use(ensureAuthenticated)

notesRoutes.get('/', callerController.index)
notesRoutes.post('/', callerController.create)
notesRoutes.get('/:id', callerController.show)
notesRoutes.put('/:id', callerController.update)
notesRoutes.delete('/:id', callerController.delete)

module.exports = notesRoutes