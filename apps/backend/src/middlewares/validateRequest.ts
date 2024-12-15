import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { z } from "zod";

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = {
        body: req.body,
        query: req.query,
        params: req.params,
      };
      schema.parse(data);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw createHttpError(400, error.errors[0].message);
      }
      throw createHttpError(500, "Internal Server Error");
    }
  };
};
