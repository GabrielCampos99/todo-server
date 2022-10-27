import AppError from "@shared/errors/AppError";
import { paginateResponse } from "@shared/utils/PaginationHelper";
import { getRepository } from "typeorm";
import Tasks from "../typeorm/entities/Tasks";

interface IRequest {
  user_id: string;
  query: any;
}

interface IPaginatedResponse {
  statusCode: string;
  data: any[];
  count: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

class ListTasksService {
  public async execute({ user_id, query }: IRequest): Promise<IPaginatedResponse> {
    const take = 10;
    const page = 1;
    const skip = (page - 1) * take;
    const tasksRepository = getRepository(Tasks);

    if (!user_id) {
      throw new AppError("User id must be informed");
    }
    const tasksFound = await tasksRepository.findAndCount({
      where: { user_id },
      take: take,
      skip: skip,
    });

    return paginateResponse(tasksFound, page, take);
  }
}

export default ListTasksService;
