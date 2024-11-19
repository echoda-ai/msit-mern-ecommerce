"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants");
const connectDB = () => {
    return new Promise((resolve, reject) => {
        mongoose_1.default
            .connect(constants_1.MONGODB_URI)
            .then(() => {
            resolve();
        })
            .catch((err) => {
            reject(err);
        });
    });
};
exports.default = connectDB;
