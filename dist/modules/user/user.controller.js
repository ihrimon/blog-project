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
exports.logout = exports.loginUser = exports.registerUser = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_model_1 = __importDefault(require("./user.model"));
const http_status_kit_1 = require("http-status-kit");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
// Registger a new user
exports.registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = yield user_model_1.default.findOne({ email });
    if (user) {
        throw new CustomError_1.default('Conflict error', http_status_kit_1.statusCodes.CONFLICT, 'User already exists!');
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, Number(config_1.default.bcrypt_salt_round));
    const newUser = yield user_model_1.default.create({ name, email, password: hashedPassword });
    const result = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
    };
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'User registered successfully',
        statusCode: http_status_kit_1.statusCodes.CREATED,
        data: result,
    });
}));
// Login a registered user
exports.loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new CustomError_1.default('Email and password are required!', http_status_kit_1.statusCodes.UNAUTHORIZED, 'Invalid credentials');
    }
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new CustomError_1.default('Not Found', http_status_kit_1.statusCodes.NOT_FOUND, 'User not found!');
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatch) {
        throw new CustomError_1.default('Wrong email or password', http_status_kit_1.statusCodes.BAD_REQUEST, 'Incorrect email or password!');
    }
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user._id,
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    // generate jwt token
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Login successful',
        statusCode: http_status_kit_1.statusCodes.OK,
        data: {
            token,
        },
    });
}));
// logout a user
exports.logout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .clearCookie('token', {
        maxAge: 0,
        secure: config_1.default.NODE_ENV === 'production',
        sameSite: config_1.default.NODE_ENV === 'production' ? 'none' : 'strict',
    })
        .json({
        success: true,
        message: 'Logged out successfully.',
    });
}));
