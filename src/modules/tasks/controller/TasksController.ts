import { Response, Request } from "express";
import CreateTasksServices from "../services/CreateTasksServices";
import GetTaskService from "../services/GetTaskService";
import ListTasksService from "../services/ListTasksService";
import UpdateTaskService from "../services/UpdateTaskService";

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

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const getTask = new GetTaskService();

    const task = await getTask.execute({
      id,
    });

    return response.json(task);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, description, user_id, id } = request.body;

    const updateTask = new UpdateTaskService();

    const task = await updateTask.execute({
      title,
      description,
      user_id,
      id,
    });

    return response.json(task);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { user_id, query } = request.body;

    const listTask = new ListTasksService();

    const task = await listTask.execute({
      user_id,
      query,
    });

    return response.json(task);
  }
}
