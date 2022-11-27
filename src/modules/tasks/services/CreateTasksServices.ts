import UsersRepository from "@modules/users/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { IResponse } from "@shared/interfaces/IResponse";
//import { StatusCodes } from "http-status-codes";
import { getCustomRepository, getRepository } from "typeorm";
import Tasks from "../typeorm/entities/Tasks";

interface IRequest {
  title: string;
  description?: string;
  user_id: string;
}


class CreateTasksServices {
  public async execute({
    title,
    description,
    user_id,
  }: IRequest): Promise<IResponse<object>> {
    const tasksRepository = getRepository(Tasks);

    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found");
    }

    const task = tasksRepository.save({ title, description, user_id: user.id });

    return { statusCode: 200, data: task };
  }
}

export default CreateTasksServices;
