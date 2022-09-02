const {Router} = require("express")
const AddressController = require("../controllers/AddressController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const addressRoutes = Router()

const  addressController = new AddressController()

addressRoutes.use(ensureAuthenticated)

addressRoutes.post('/', addressController.create)
addressRoutes.put('/:id', addressController.update)

module.exports = addressRoutes