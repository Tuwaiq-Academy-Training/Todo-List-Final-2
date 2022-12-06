"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const validate_1 = __importDefault(require("../middleware/validate"));
const auth_schema_1 = require("../zod_schema/auth.schema");
const router = express_1.default.Router();
router.post('/register', (0, validate_1.default)(auth_schema_1.registerSchema), auth_controller_1.registerHandler);
router.post('/login', (0, validate_1.default)(auth_schema_1.loginSchema), auth_controller_1.loginHandler);
exports.default = router;
