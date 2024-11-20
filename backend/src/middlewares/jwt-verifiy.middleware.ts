import { NextFunction, Response } from "express";
import { StatusCodes } from "../utils/status-code";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";

export const jwtVerify = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "UNAUTHORIZED",
      });
      return;
    }

    jwt.verify(token, JWT_SECRET, (err: any, decode: any) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "TOKEN_EXPIRED",
            err,
          });
        }
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: "INVALID_TOKEN",
          err,
        });
      }
      req.userId = decode?.id;
      next();
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error,
    });
  }
};
