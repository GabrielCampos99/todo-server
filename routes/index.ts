import { Router } from "express";
import usersRouter from "../src/modules/users/routes/user.routes";
import sessionRouter from "../src/modules/users/routes/sessions.routes";
import tasksRouter from "../src/modules/tasks/routes/tasks.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/tasks", tasksRouter);
routes.use("/session", sessionRouter);

export default routes;
