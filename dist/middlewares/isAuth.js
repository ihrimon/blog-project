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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const http_status_kit_1 = require("http-status-kit");
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const USER_ROLE = {
    user: 'user',
    admin: 'admin',
};
const isAuth = (...requiredRole) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        // checking if the token is missing
        if (!token) {
            throw new CustomError_1.default('Unauthorized access', http_status_kit_1.statusCodes.UNAUTHORIZED, 'You are not authorized!');
        }
        // checking if the given token is valid
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { role, email } = decoded;
        if (requiredRole && !requiredRole.includes(role)) {
            throw new CustomError_1.default('Unauthorized access', http_status_kit_1.statusCodes.UNAUTHORIZED, 'You are not authorized!');
        }
        // checking if the user is exist
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            throw new CustomError_1.default('Not Found', http_status_kit_1.statusCodes.NOT_FOUND, 'User not found!');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = isAuth;
