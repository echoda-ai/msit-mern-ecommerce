import { Request, Response } from "express";
import { logger } from "../utils/logger";
import { StatusCodes } from "../utils/status-code";

type ResponseType = {
  message?: string;
};

/**
 * Error handler middleware
 * @param err - Error object
 * @param req - Request object
 * @param res - Response object
 *
 */
export const errorHandler = (err: Error, req: Request, res: Response): void => {
  const response: ResponseType = {};
  if (err.message) {
    const logs = {
      type: err.name,
      message: err.message,
      method: req.method,
      path: req.path,
      params: req.route.path,
      body: req.body,
      query: req.query,
      stack: err.stack,
    };
    logger.error(JSON.stringify(logs));
    response.message = err.message || "Something wrong!";
  }

  res.json(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: response.message,
  });
};
