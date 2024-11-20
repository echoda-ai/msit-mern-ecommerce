"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = void 0;
const status_code_1 = require("../utils/status-code");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const jwtVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            res.status(status_code_1.StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "UNAUTHORIZED",
            });
            return;
        }
        jsonwebtoken_1.default.verify(token, constants_1.JWT_SECRET, (err, decode) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(status_code_1.StatusCodes.UNAUTHORIZED).json({
                        success: false,
                        message: "TOKEN_EXPIRED",
                        err,
                    });
                }
                return res.status(status_code_1.StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    message: "INVALID_TOKEN",
                    err,
                });
            }
            req.userId = decode === null || decode === void 0 ? void 0 : decode.id;
            next();
        });
    }
    catch (error) {
        res.status(status_code_1.StatusCodes.BAD_REQUEST).json({
            success: false,
            message: error,
        });
    }
});
exports.jwtVerify = jwtVerify;
