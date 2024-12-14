import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

/**
 * Global Error Middleware
 */
export const errorMiddleware = (
  err: createHttpError.HttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    err instanceof createHttpError.HttpError ? err.status : 500;
  const message =
    err instanceof createHttpError.HttpError
      ? err.message
      : "Internal Server Error";

  const errorResponse = {
    status: "error",
    statusCode,
    message,
    ...(process.env.NODE_ENV === "dev" && { stack: err.stack }), // Include stack trace in development
  };

  if (process.env.NODE_ENV !== "prod") {
    console.error(`[Error] ${err.message}`, err.stack);
  }

  res.status(statusCode).json(errorResponse);
};
