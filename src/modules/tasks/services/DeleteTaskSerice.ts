import AppError from "@shared/errors/AppError";
import Tasks from "../typeorm/entities/Tasks";
import { getRepository } from "typeorm";

interface IRequest {
  id: string;
}
class GetTaskService {
  public async execute({ id }: IRequest): Promise<Tasks | undefined> {
    const tasksRepository = getRepository(Tasks);
    const taskFound = await tasksRepository.findOne({ where: { id } });

    if (!taskFound) {
      throw new AppError("Task not found");
    }

    const taskDeleted = tasksRepository.delete(taskFound.id);

    if (!taskDeleted) {
      throw new AppError("Task fail to delete");
    }

    return taskFound;
  }
}

export default GetTaskService;
