"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controller_1 = require("../controller/todo.controller");
const auth_1 = require("../middleware/auth");
const validate_1 = __importDefault(require("../middleware/validate"));
const todo_schema_1 = require("../zod_schema/todo.schema");
const router = express_1.default.Router();
router.get('/', auth_1.protect, todo_controller_1.getAllTodoHandler);
router.post('/', auth_1.protect, (0, validate_1.default)(todo_schema_1.addTodoSchema), todo_controller_1.addTodoHandler);
router.put('/:todoid', auth_1.protect, (0, validate_1.default)(todo_schema_1.updateTodoSchema), todo_controller_1.updateTodoHandler);
router.delete('/:todoid', auth_1.protect, (0, validate_1.default)(todo_schema_1.deleteTodoSchema), todo_controller_1.deleteTodoHandler);
exports.default = router;
