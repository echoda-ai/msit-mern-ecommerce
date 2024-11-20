"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    filename: (_req, file, cb) => {
        const hash = (0, crypto_1.createHash)("md5")
            .update(file.originalname + Date.now())
            .digest("hex");
        const extension = path_1.default.extname(file.originalname);
        cb(null, `${hash}${extension}`);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true); // Accept the file
    }
    else {
        cb(null, false);
    }
};
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter,
});
exports.default = upload;
