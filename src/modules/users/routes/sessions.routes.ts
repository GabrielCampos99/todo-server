import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import SessionsController from "../controllers/SessionsController";

const sessionsController = new SessionsController();

const sessionRouter = Router();

sessionRouter.post(
    '/',
    celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    }),
    sessionsController.create
  );

  export default sessionRouter
