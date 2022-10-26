import { Router } from "express";
import usersRouter from "../../../modules/users/routes/user.routes";
import sessionRouter from "../../../modules/users/routes/sessions.routes";
const routes = Router();

routes.use("/users", usersRouter);
routes.use("/session", sessionRouter);

export default routes;
