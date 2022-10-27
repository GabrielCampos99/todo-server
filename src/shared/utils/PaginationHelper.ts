//https://stackoverflow.com/questions/53922503/how-to-implement-pagination-in-nestjs-with-typeorm
export function paginateResponse(
  data: [any[], number],
  page: number,
  limit: number
) {
  const [result, total] = data;
  const lastPage = Math.ceil(total / limit);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;
  return {
    statusCode: "success",
    data: [...result],
    count: total,
    currentPage: page,
    nextPage: nextPage,
    prevPage: prevPage,
    lastPage: lastPage,
  };
}
