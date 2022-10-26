import { Router } from "express";
import usersRouter from "../../../modules/users/routes/user.routes";
import sessionRouter from "../../../modules/users/routes/sessions.routes";
import tasksRouter from "../../../modules/tasks/routes/tasks.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/tasks", tasksRouter);
routes.use("/session", sessionRouter);

export default routes;
