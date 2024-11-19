import { NextFunction, Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { validateData } from "../middlewares/validation.middleware";
import { userSchema } from "../schema/user.schema";
import userModel from "../model/user.model";

const router = Router();

router.post(
  "/sign-up",
  validateData(userSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password, avatar } = req.body;
      const user = await userModel.findOne({ email });
      if (user) {
        throw new Error("Already user exits.");
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt);
      const payload = {
        ...req.body,
        password: hashPassword,
      };
      const userData = new userModel(payload);
      const saveUSer = userData.save();

      res.status(201).json({
        data: saveUSer,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
