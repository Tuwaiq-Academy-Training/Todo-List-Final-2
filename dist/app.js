"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static('./client/build'));
app.use((0, cors_1.default)());
(0, db_1.connectDB)();
app.use('/api/v1/auth', auth_route_1.default);
app.use('/api/v1/todo', todo_route_1.default);
app.use((req, res, next) => {
    return res.sendFile(path_1.default.join(__dirname, '../client/build/index.html'));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running in port 5000');
});
