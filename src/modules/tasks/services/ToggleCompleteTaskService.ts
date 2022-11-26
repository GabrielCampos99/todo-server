import AppError from "@shared/errors/AppError";
import { getRepository } from "typeorm";
import Tasks from "../typeorm/entities/Tasks";

interface IRequest {
  user_id: string;
  id: string;
}

class ToggleCompleteTaskService {
  public async execute({
    id,

    user_id,
  }: IRequest): Promise<Tasks | undefined> {
    const tasksRepository = getRepository(Tasks);
    const taskFound = await tasksRepository.findOne(id);

    if (!taskFound) {
      throw new AppError("Task not found.");
    }

    if (+user_id !== +taskFound.user_id) {
      throw new AppError("Task can be modified by his own onwner.");
    }

    taskFound.completed = !taskFound.completed;
    const task = tasksRepository.save(taskFound);
    return task;
  }
}

export default ToggleCompleteTaskService;
