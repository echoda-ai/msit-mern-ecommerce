"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_middleware_1 = __importDefault(require("../middlewares/multer.middleware"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/user/avatar:
 *   post:
 *     summary: Set avatar picture
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully created
 *       500:
 *         description: Internal server error
 */
router.post("/avatar", multer_middleware_1.default.single("file"), (req, res) => { });
exports.default = router;
