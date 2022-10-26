import { Response, Request } from "express";
import CreateTasksServices from "../services/CreateTasksServices";

export default class TasksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description, user_id } = request.body;

    const createTask = new CreateTasksServices();

    const task = await createTask.execute({
      title,
      description,
      user_id,
    });

    return response.json(task);
  }
}
