import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import bcrypt from "bcrypt";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IUserRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userFound = await usersRepository.findByEmail(email);

    if (userFound) {
      throw new AppError("Email address already used.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
