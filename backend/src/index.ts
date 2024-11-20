import express, { json, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { PORT } from "./constants";
import connectDB from "./config/db";
import { logger } from "./utils/logger";
import router from "./routes";
import { specs, swaggerUi } from "./config/swagger";
import { errorHandler } from "./middlewares/error.middleware";
import { StatusCodes } from "./utils/status-code";

const app = express();

connectDB()
  .then(() => {
    logger.info("Connect to mongodb successfully");
  })
  .catch((error) => {
    logger.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());
app.use(helmet());
app.use(json({ limit: "8mb" }));
app.use(cookieParser());
app.use("/api", router);
app.use("*", (_, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "NOT_FOUND",
  });
});
app.use(errorHandler);

app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
