import AppError from "@shared/errors/AppError";
import { getRepository } from "typeorm";
import Tasks from "../typeorm/entities/Tasks";

interface IRequest {
  title: string;
  description?: string;
  user_id: string;
  id: string;
}

class UpdateTaskService {
  public async execute({
    id,
    title,
    description,
    user_id,
  }: IRequest): Promise<Tasks> {
    const tasksRepository = getRepository(Tasks);

    const taskFound = await tasksRepository.findOne(id);

    if (!taskFound) {
      throw new AppError("Task not found.");
    }

    if (+user_id !== +taskFound.user_id) {
      throw new AppError("Task can be modified by his own onwner.");
    }

    const task = tasksRepository.save({ title, description });

    return task;
  }
}

export default UpdateTaskService;
