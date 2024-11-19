import e from "express";
import { getEnv } from "./config/get-env";

export const PORT = getEnv("PORT") as number;
export const MONGODB_URI = getEnv("MONGODB_URI") as string;

export const JWT_SECRET = getEnv("JWT_SECRET") as string;
