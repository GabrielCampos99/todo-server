import { isAuthenticated } from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import TasksController from "../controller/TasksController";

const tasksController = new TasksController();

const tasksRouter = Router();
tasksRouter.use(isAuthenticated);

tasksRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().optional().allow(null),
      title: Joi.string().required(),
    },
  }),
  tasksController.create
);

tasksRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  tasksController.get
);

tasksRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      description: Joi.string().optional().allow(null),
      completed: Joi.boolean().optional(),
      title: Joi.string(),
    },
  }),
  tasksController.update
);

tasksRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  tasksController.delete
);

tasksRouter.get(
  "/",
  celebrate({
    [Segments.PARAMS]: {
      page: Joi.string().optional(),
    },
  }),
  tasksController.list
);

export default tasksRouter;
