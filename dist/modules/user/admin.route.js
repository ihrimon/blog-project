"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const isAuth_1 = __importDefault(require("../../middlewares/isAuth"));
const blog_controller_1 = require("../blog/blog.controller");
const router = express_1.default.Router();
// router for block user
router.patch('/users/:userId/block', (0, isAuth_1.default)('admin'), blog_controller_1.blockUserByAdmin);
// router for delete blog
router.delete('/blogs/:id', (0, isAuth_1.default)('admin'), blog_controller_1.deleteBlogByAdmin);
exports.AdminRoutes = router;
