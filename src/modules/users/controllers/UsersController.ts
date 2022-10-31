import { Response, Request } from "express";
import CreateUserService from "../services/CreateUserService";
import GetUserByIdService from "../services/GetUserByIdService";

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const createUser = new GetUserByIdService();

    const user = await createUser.execute({
      id
    });

    return response.json(user);
  }
}
