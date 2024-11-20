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
const multer_middleware_1 = __importDefault(require("../middlewares/multer.middleware"));
const jwt_verifiy_middleware_1 = require("../middlewares/jwt-verifiy.middleware");
const user_model_1 = __importDefault(require("../model/user.model"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const status_code_1 = require("../utils/status-code");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/users/avatar:
 *   post:
 *     summary: Set avatar picture
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar successfully updated
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/avatar", jwt_verifiy_middleware_1.jwtVerify, multer_middleware_1.default.single("file"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary_1.default.uploader.upload(req.file.path, {
            folder: "avatar",
        });
        const updateUser = yield user_model_1.default.findByIdAndUpdate(req.userId, {
            avatar: result.secure_url,
        }, { new: true, projection: { avatar: 1 } });
        res.status(status_code_1.StatusCodes.OK).json({
            success: true,
            data: updateUser,
        });
    }
    catch (error) {
        next(error);
    }
}));
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: This endpoint retrieves all users from the database.
 *     security:
 *       - BearerAuth: []  # Assuming JWT authentication is used
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       500:
 *         description: Internal server error
 */
router.get("/", jwt_verifiy_middleware_1.jwtVerify, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_model_1.default.find({}, "username email");
        res.status(status_code_1.StatusCodes.OK).json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
