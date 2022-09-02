const {Router} = require("express")
const AttendanceController = require("../controllers/AttendanceController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const attendanceRoutes = Router()

const  attendanceController = new AttendanceController()

attendanceRoutes.use(ensureAuthenticated)

attendanceRoutes.post('/', attendanceController.create)
attendanceRoutes.put('/:id', attendanceController.update)

module.exports = attendanceRoutes