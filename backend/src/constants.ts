import e from "express";
import { getEnv } from "./config/get-env";

export const PORT = getEnv("PORT") as number;
export const MONGODB_URI = getEnv("MONGODB_URI") as string;

export const JWT_SECRET = getEnv("JWT_SECRET") as string;

export const CLOUDINARY_CLOUD_NAME = getEnv("CLOUDINARY_CLOUD_NAME") as string;
export const CLOUDINARY_API_KEY = getEnv("CLOUDINARY_API_KEY") as string;
export const CLOUDINARY_API_SECRET = getEnv("CLOUDINARY_API_SECRET") as string;
