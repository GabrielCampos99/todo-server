import AppError from "@shared/errors/AppError";
import { getRepository } from "typeorm";
import Tasks from "../typeorm/entities/Tasks";

interface IRequest {
  title: string;
  description?: string;
  user_id: string;
  completed: boolean;
  id: string;
}

class UpdateTaskService {
  public async execute({
    id,
    title,
    description,
    completed,
    user_id,
  }: IRequest): Promise<Tasks | undefined> {
    if (!title && !description)
      throw new AppError("You must need send some information");

    const tasksRepository = getRepository(Tasks);

    const taskFound = await tasksRepository.findOne(id);

    if (!taskFound) {
      throw new AppError("Task not found.");
    }

    if (+user_id !== +taskFound.user_id) {
      throw new AppError("Task can be modified by his own onwner.");
    }

    taskFound.title = title;
    taskFound.description = description;
    taskFound.completed = completed;

    const task = tasksRepository.save(taskFound);

    return task;
  }
}

export default UpdateTaskService;
