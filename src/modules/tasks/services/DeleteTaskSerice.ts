import AppError from "@shared/errors/AppError";
import Tasks from "../typeorm/entities/Tasks";
import { getRepository } from "typeorm";

interface IRequest {
  id: string;
  user_id: string;
}
class DeleteTaskService {
  public async execute({ id, user_id }: IRequest): Promise<Tasks | undefined> {
    if (!user_id) {
      throw new AppError("User id must be informed");
    }

    const tasksRepository = getRepository(Tasks);
    const taskFound = await tasksRepository.findOne(id);
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

export default DeleteTaskService;
