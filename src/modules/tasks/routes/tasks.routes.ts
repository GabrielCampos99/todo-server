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
      title: Joi.string().required(),
      description: Joi.string().optional(),
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
      title: Joi.string().required(),
      description: Joi.string().optional(),
    },
  }),
  usersController.create
);

tasksRouter.get("/", usersController.list);

export default tasksRouter;
