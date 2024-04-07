"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlog = exports.blogSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    name: zod_1.default.string().optional(),
    password: zod_1.default.string().min(8)
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8)
});
exports.blogSchema = zod_1.default.object({
    title: zod_1.default.string().max(100),
    content: zod_1.default.string()
});
exports.updateBlog = zod_1.default.object({
    title: zod_1.default.string().max(100),
    content: zod_1.default.string(),
    id: zod_1.default.string()
});
