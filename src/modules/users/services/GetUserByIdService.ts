import AppError from "@shared/errors/AppError";
import { getRepository } from "typeorm";
import User from "../typeorm/entities/User";

interface IRequest {
  id: string;
}
class GetUserByIdService {
  public async execute({ id }: IRequest): Promise<User | undefined> {
    const userRepository = getRepository(User);
    const user = userRepository.findOne({ where: { id } });

    if (!user) {
      throw new AppError("user not found");
    }

    return user;
  }
}

export default GetUserByIdService;
