"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const constants_1 = require("./constants");
const db_1 = __importDefault(require("./config/db"));
const logger_1 = require("./utils/logger");
const routes_1 = __importDefault(require("./routes"));
const swagger_1 = require("./config/swagger");
const app = (0, express_1.default)();
(0, db_1.default)()
    .then(() => {
    logger_1.logger.info("Connect to mongodb successfully");
})
    .catch((error) => {
    logger_1.logger.error("Failed to connect to MongoDB", error);
    process.exit(1);
});
app.use("/api-docs", swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.specs));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, express_1.json)({ limit: "8mb" }));
app.use((0, cookie_parser_1.default)());
app.use("/api", routes_1.default);
app.listen(constants_1.PORT, () => logger_1.logger.info(`Server is running on port ${constants_1.PORT}`));
