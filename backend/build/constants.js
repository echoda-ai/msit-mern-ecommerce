"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.MONGODB_URI = exports.PORT = void 0;
const get_env_1 = require("./config/get-env");
exports.PORT = (0, get_env_1.getEnv)("PORT");
exports.MONGODB_URI = (0, get_env_1.getEnv)("MONGODB_URI");
exports.JWT_SECRET = (0, get_env_1.getEnv)("JWT_SECRET");
