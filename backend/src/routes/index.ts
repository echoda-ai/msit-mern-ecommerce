import authRouter from "./auth.route";
import userRouter from "./user.route";
import categoryRouter from "./category.route";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);

export default router;
