import authRouter from "./auth.route";
import userRouter from "./user.route";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
