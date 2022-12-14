import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { errors } from "celebrate";
import AppError from "../errors/AppError";
import "@shared/typeorm";
import routes from "./routes/index";

const app = express();


app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
     console.log(error, 'error agqui')
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }
    console.log(error, 'error')
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started on port ${port} ou magica! 🏆`);
});
