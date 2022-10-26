import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import authConfig from "@config/auth";

interface IResquest {
  email: string;
  password: string;
}

interface ICreateSessionPromise {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({
    email,
    password,
  }: IResquest): Promise<ICreateSessionPromise> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        "Incorrect email/passwod combination.",
        StatusCodes.UNAUTHORIZED
      );
    }

    const passwordConfirmed = await bcrypt.compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError(
        "Incorrect email/passwod combination.",
        StatusCodes.UNAUTHORIZED
      );
    }

    const token = jwt.sign(
      {
        data: {
          user: {
            id: user.id,
            name: user.name,
          },
        },
      },
      authConfig.jwt.secret,
      { expiresIn: "1h" }
    );

    return { user, token };
  }
}

export default CreateSessionsService;
