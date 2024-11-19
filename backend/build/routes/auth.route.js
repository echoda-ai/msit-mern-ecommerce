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
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validation_middleware_1 = require("../middlewares/validation.middleware");
const user_schema_1 = require("../schema/user.schema");
const user_model_1 = __importDefault(require("../model/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const status_code_1 = require("../utils/status-code");
const constants_1 = require("../constants");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Validation error or user already exists
 *       500:
 *         description: Internal server error
 */
router.post("/sign-up", (0, validation_middleware_1.validateData)(user_schema_1.userSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (user) {
            res.status(status_code_1.StatusCodes.CONFLICT).json({
                success: false,
                message: "ALREADY_EXIST",
            });
            return;
        }
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashPassword = yield bcrypt_1.default.hashSync(password, salt);
        const payload = Object.assign(Object.assign({}, req.body), { password: hashPassword });
        const userData = new user_model_1.default(payload);
        const saveUSer = userData.save();
        res.status(status_code_1.StatusCodes.CREATED).json({
            data: saveUSer,
        });
    }
    catch (error) {
        next(error);
    }
}));
/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     summary: Login a new user
 *     description: Login with credential
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully created
 *       400:
 *         description: Validation error or user already exists
 *       500:
 *         description: Internal server error
 */
router.post("/sign-in", (0, validation_middleware_1.validateData)(user_schema_1.loginSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(status_code_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "USER_NOT_FOUND",
            });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(status_code_1.StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "INVALID_CREDENTIALS",
            });
            return;
        }
        const payload = {
            id: user._id,
            username: user.username,
            iat: Math.floor(Date.now() / 1000), // Current timestamp
        };
        const token = yield jsonwebtoken_1.default.sign(payload, constants_1.JWT_SECRET, {
            expiresIn: 60 * 60 * 8, // Expire in 8hours
        });
        const tokenOption = {
            httpOnly: true,
            secure: true,
        };
        res.cookie("token", token, tokenOption).status(status_code_1.StatusCodes.OK).json({
            success: true,
            data: token,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
