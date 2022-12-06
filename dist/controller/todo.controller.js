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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoHandler = exports.updateTodoHandler = exports.addTodoHandler = exports.getAllTodoHandler = void 0;
const db_1 = require("../config/db");
const getAllTodoHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const todoList = yield db_1.prisma.todo.findMany({
        where: { user_id: user.id },
    });
    return res.status(200).json(todoList);
});
exports.getAllTodoHandler = getAllTodoHandler;
const addTodoHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const user = res.locals.user;
    yield db_1.prisma.todo.create({
        data: {
            title,
            user_id: user.id,
        },
    });
    return res.status(201).json({
        message: 'New todo created for user : ' + user.id,
    });
});
exports.addTodoHandler = addTodoHandler;
const updateTodoHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const updatedTodo = req.body;
        const { todoid } = req.params;
        const isUpdated = yield db_1.prisma.todo.updateMany({
            where: {
                id: todoid,
                user_id: user.id,
            },
            data: updatedTodo,
        });
        if (isUpdated.count == 0) {
            return res.status(400).json({
                message: 'Invalid todo id',
            });
        }
        return res.status(200).json({
            message: 'Todo updated !',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error !',
        });
    }
});
exports.updateTodoHandler = updateTodoHandler;
const deleteTodoHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const { todoid } = req.params;
    const deleteCount = yield db_1.prisma.todo.deleteMany({
        where: {
            id: todoid,
            user_id: user.id,
        },
    });
    if (deleteCount.count == 0) {
        return res.status(400).json({
            message: 'Invalid todo id',
        });
    }
    return res.status(200).json({
        message: 'Todo deleted !',
    });
});
exports.deleteTodoHandler = deleteTodoHandler;
