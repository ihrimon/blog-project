"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const isAuth_1 = __importDefault(require("../../middlewares/isAuth"));
const isValidate_1 = __importDefault(require("../../middlewares/isValidate"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
// router for new blog creation
router.post('/', (0, isAuth_1.default)('user'), (0, isValidate_1.default)(blog_validation_1.createBlogValidation), blog_controller_1.createBlogByUser);
// public route for all blog
router.get('/', blog_controller_1.getAllBlogs);
// update blog using user role
router.patch('/:id', (0, isAuth_1.default)('user'), (0, isValidate_1.default)(blog_validation_1.updateBlogValidation), blog_controller_1.updatedBlogByUser);
router.delete('/:id', (0, isAuth_1.default)('user'), blog_controller_1.deleteBlogByUser);
exports.BlogRoutes = router;
