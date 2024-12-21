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
exports.deleteBlogByAdmin = exports.blockUserByAdmin = exports.deleteBlogByUser = exports.updatedBlogByUser = exports.getAllBlogs = exports.createBlogByUser = void 0;
const http_status_kit_1 = require("http-status-kit");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_model_1 = __importDefault(require("../user/user.model"));
const blog_model_1 = __importDefault(require("./blog.model"));
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
// create a blog by user role
exports.createBlogByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const { title, content } = req.body;
    const author = yield user_model_1.default.findOne({ email });
    const blog = yield blog_model_1.default.create({
        title,
        content,
        author: author === null || author === void 0 ? void 0 : author._id,
    });
    const result = {
        _id: blog._id,
        title: blog.title,
        content: blog.content,
        author: {
            _id: author === null || author === void 0 ? void 0 : author._id,
            name: author === null || author === void 0 ? void 0 : author.name,
            email: author === null || author === void 0 ? void 0 : author.email,
        },
    };
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Blog created successfully',
        statusCode: http_status_kit_1.statusCodes.CREATED,
        data: result,
    });
}));
// get all blog by query parameter
exports.getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sortBy, sortOrder, filter } = req.query;
    const query = {};
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } },
        ];
    }
    if (filter) {
        query._id = filter;
    }
    const sortOrderValue = sortOrder === 'asc' ? 1 : -1;
    const blog = yield blog_model_1.default.find(query)
        .populate({
        path: 'author',
        select: '_id name email',
    })
        .sort({
        [sortBy]: sortOrderValue,
    });
    const result = blog.map((key) => ({
        _id: key._id,
        title: key.title,
        content: key.content,
        author: key.author,
    }));
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Blogs fetched successfully',
        statusCode: http_status_kit_1.statusCodes.OK,
        data: result,
    });
}));
// update blog by user role
exports.updatedBlogByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const author = yield user_model_1.default.findOne({ email });
    const blog = yield blog_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    const result = {
        _id: blog === null || blog === void 0 ? void 0 : blog._id,
        title: blog === null || blog === void 0 ? void 0 : blog.title,
        content: blog === null || blog === void 0 ? void 0 : blog.content,
        author: {
            _id: author === null || author === void 0 ? void 0 : author._id,
            name: author === null || author === void 0 ? void 0 : author.name,
            email: author === null || author === void 0 ? void 0 : author.email,
        },
    };
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Blog updated successfully',
        statusCode: http_status_kit_1.statusCodes.OK,
        data: result,
    });
}));
// delete blog by user role
exports.deleteBlogByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield blog_model_1.default.findByIdAndDelete(req.params.id);
    res.json({
        success: true,
        message: 'Blog deleted successfully',
        statusCode: 200,
    });
}));
// user block by admin role
exports.blockUserByAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield user_model_1.default.findById(userId);
    if (user === null || user === void 0 ? void 0 : user.isBlocked) {
        throw new CustomError_1.default('Blocked user', http_status_kit_1.statusCodes.CONFLICT, 'This user already blocked!');
    }
    // status change by its id
    yield user_model_1.default.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
    res.json({
        success: true,
        message: 'User blocked successfully',
        statusCode: 200,
    });
}));
// delele blog by admin role
exports.deleteBlogByAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield blog_model_1.default.findByIdAndDelete(req.params.id);
    res.json({
        success: true,
        message: 'Blog deleted successfully',
        statusCode: 200,
    });
}));
