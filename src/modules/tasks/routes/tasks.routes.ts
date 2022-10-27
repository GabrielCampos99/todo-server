import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import TasksController from "../controller/TasksController";

const usersController = new TasksController();

const tasksRouter = Router();

tasksRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().optional(),
      user_id: Joi.string().required(),
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
  usersController.create
);

tasksRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().optional(),
      user_id: Joi.string().required(),
    },
  }),
  usersController.create
);

tasksRouter.get(
  "/",
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
    },
  }),
  usersController.list
);

export default tasksRouter;
