import { Response, Request } from "express";
import CreateTasksServices from "../services/CreateTasksServices";
import DeleteTaskService from "../services/DeleteTaskSerice";
import GetTaskService from "../services/GetTaskService";
import ListTasksService from "../services/ListTasksService";
import UpdateTaskService from "../services/UpdateTaskService";

export default class TasksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { title, description } = request.body;

    const createTask = new CreateTasksServices();

    const task = await createTask.execute({
      title,
      description,
      user_id,
    });

    return response.json(task);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getTask = new GetTaskService();
    const task = await getTask.execute({
      id,
    });

    return response.json(task);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, description, completed } = request.body;
    const user_id = request.user.id;
    const { id } = request.params;
    const updateTask = new UpdateTaskService();
    const task = await updateTask.execute({
      description,
      completed,
      user_id,
      title,
      id,
    });

    return response.json(task);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const page = request.query.page as string;

    const { query } = request.body;
    const listTask = new ListTasksService();
    const task = await listTask.execute({
      user_id,
      query,
      page,
    });

    return response.json(task);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const deleteTask = new DeleteTaskService();

    const task = await deleteTask.execute({
      user_id,
      id,
    });

    return response.json(task);
  }
}
