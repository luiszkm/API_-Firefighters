const { Router } = require("express");
const usersRoutes = require("./users.routes")
const sessionsRoutes = require("./sessions.routes");
const calledRouter = require("./called.routes");
const addressRoutes = require("./address.routes");
const attendanceRoutes = require("./attendance.routes");



const productsRouter = require("./products.routes");
const ingredientRouter = require("./ingredient.routes");
const purchasesRouter = require("./purchases.routes");
const favoritesRouter = require("./favorites.routes");


const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/called", calledRouter);
routes.use("/address", addressRoutes);
routes.use("/attendance", attendanceRoutes);



routes.use("/products", productsRouter);

routes.use("/ingredients", ingredientRouter);
routes.use("/sessions", sessionsRoutes);
routes.use("/purchases", purchasesRouter);
routes.use("/favorites", favoritesRouter);


module.exports = routes;