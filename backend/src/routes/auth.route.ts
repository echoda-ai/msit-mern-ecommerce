import { NextFunction, Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { validateData } from "../middlewares/validation.middleware";
import { loginSchema, userSchema } from "../schema/user.schema";
import userModel from "../model/user.model";
import jwt from "jsonwebtoken";
import { StatusCodes } from "../utils/status-code";
import { JWT_SECRET } from "../constants";

const router = Router();

/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with the provided details.
 *     tags:
 *        - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Validation error or user already exists
 *       500:
 *         description: Internal server error
 */
router.post(
  "/sign-up",
  validateData(userSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (user) {
        res.status(StatusCodes.CONFLICT).json({
          success: false,
          message: "ALREADY_EXIST",
        });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt);
      const payload = {
        ...req.body,
        password: hashPassword,
      };
      const userData = new userModel(payload);
      const saveUSer = userData.save();

      res.status(StatusCodes.CREATED).json({
        success: true,
        data: saveUSer,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     summary: Login a new user
 *     description: Login with credential
 *     tags:
 *        - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully created
 *       400:
 *         description: Validation error or user already exists
 *       500:
 *         description: Internal server error
 */
router.post(
  "/sign-in",
  validateData(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "USER_NOT_FOUND",
        });
        return;
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password as string
      );
      if (!isPasswordValid) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: "INVALID_CREDENTIALS",
        });
        return;
      }
      const payload = {
        id: user._id,
        username: user.username,
        iat: Math.floor(Date.now() / 1000), // Current timestamp
      };
      const token = await jwt.sign(payload, JWT_SECRET, {
        expiresIn: 60 * 60 * 8, // Expire in 8hours
      });

      const tokenOption = {
        httpOnly: true,
        secure: true,
      };

      res.cookie("token", token, tokenOption).status(StatusCodes.OK).json({
        success: true,
        data: token,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
