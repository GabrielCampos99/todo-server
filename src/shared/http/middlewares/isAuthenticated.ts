import { Request, Response, NextFunction } from "express";
import authConfig from "@config/auth";
import { verify } from "jsonwebtoken";
import AppError from "@shared/errors/AppError";

interface ITokenPayload {
  iat: number;
  exp: number;
  data: { user: { id: string; name: string } };
}

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token is missing.");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { data } = decodedToken as ITokenPayload;

    request.user = {
      id: data.user.id,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT Token.");
  }
};
