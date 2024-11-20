"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const targetSegment = "/src/";
const envPath = path_1.default.resolve(process.cwd());
let newPath = envPath;
const index = envPath.indexOf(targetSegment);
if (index !== -1)
    newPath = path_1.default.resolve(envPath.substring(0, index));
dotenv_1.default.config({ path: path_1.default.resolve(newPath, ".env") });
const getEnv = (key) => {
    const envValue = process.env[key];
    if (typeof envValue === "undefined") {
        throw new Error(`Environment variable ${key} is not set.`);
    }
    return envValue;
};
exports.getEnv = getEnv;
