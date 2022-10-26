import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import UsersController from "../controllers/UsersController";

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post(
    '/',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    }),
    usersController.create
  );

  export default usersRouter
