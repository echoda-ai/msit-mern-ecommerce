"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
const zod_1 = require("zod");
const status_code_1 = require("../utils/status-code");
function validateData(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: `${issue.path.join(".")} is ${issue.message}`,
                }));
                res
                    .status(status_code_1.StatusCodes.BAD_REQUEST)
                    .json({ error: "Invalid data", details: errorMessages });
            }
            else {
                res
                    .status(status_code_1.StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ error: "Internal Server Error" });
            }
        }
    };
}
