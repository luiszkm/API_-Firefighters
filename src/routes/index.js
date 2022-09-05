const { Router } = require("express");
const usersRoutes = require("./users.routes")
const sessionsRoutes = require("./sessions.routes");
const calledRouter = require("./called.routes");
const addressRoutes = require("./address.routes");
const attendanceRoutes = require("./attendance.routes");
const clinicalRoutes = require("./clinical.routes");
const traumasRoutes = require("./traumas.routes");
const woundRoutes = require("./wound.routes");



const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/called", calledRouter);
routes.use("/address", addressRoutes);
routes.use("/attendance", attendanceRoutes);
routes.use("/clinical", clinicalRoutes);
routes.use("/traumas", traumasRoutes);
routes.use("/wound", woundRoutes);

routes.use("/sessions", sessionsRoutes);


module.exports = routes;