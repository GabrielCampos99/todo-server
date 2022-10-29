import { isAuthenticated } from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import TasksController from "../controller/TasksController";

const usersController = new TasksController();

const tasksRouter = Router();
tasksRouter.use(isAuthenticated);

tasksRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().optional(),
      title: Joi.string().required(),
    },
  }),
  usersController.create
);

tasksRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  usersController.get
);

tasksRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      description: Joi.string().optional(),
      completed: Joi.boolean().optional(),
      title: Joi.string(),
    },
  }),
  usersController.update
);

tasksRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  usersController.delete
);

tasksRouter.get("/", usersController.list);

export default tasksRouter;
