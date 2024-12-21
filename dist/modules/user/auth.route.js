"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const isValidate_1 = __importDefault(require("../../middlewares/isValidate"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
// route for user register
router.post('/register', (0, isValidate_1.default)(user_validation_1.createUserSchemaValidation), user_controller_1.registerUser);
// route for user login
router.post('/login', user_controller_1.loginUser);
// route for user logout
router.get('/logout', user_controller_1.logout);
exports.AuthRoutes = router;
