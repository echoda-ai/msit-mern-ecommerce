"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../utils/logger");
const status_code_1 = require("../utils/status-code");
/**
 * Error handler middleware
 * @param err - Error object
 * @param req - Request object
 * @param res - Response object
 *
 */
const errorHandler = (err, req, res) => {
    const response = {};
    if (err.message) {
        const logs = {
            type: err.name,
            message: err.message,
            method: req.method,
            path: req.path,
            params: req.route.path,
            body: req.body,
            query: req.query,
            stack: err.stack,
        };
        logger_1.logger.error(JSON.stringify(logs));
        response.message = err.message || "Something wrong!";
    }
    res.json(status_code_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: response.message,
    });
};
exports.errorHandler = errorHandler;
