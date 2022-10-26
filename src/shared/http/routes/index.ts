import { Router } from "express";
import usersRouter from "../../../modules/users/routes/user.routes";
const routes = Router();

routes.use("/users", usersRouter);

export default routes;
