import AppError from "@shared/errors/AppError";
import Tasks from "../typeorm/entities/Tasks";
import { getRepository } from "typeorm";

interface IRequest {
  id: string;
}
class GetTaskService {
  public async execute({ id }: IRequest): Promise<Tasks | undefined> {
    console.log(id)
    const tasksRepository = getRepository(Tasks);
    const task = await tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new AppError("Task not found");
    }

    return task;
  }
}

export default GetTaskService;
