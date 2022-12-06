"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Logout = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (<react_1.Button onClick={logout} backgroundColor='red.400'>
      Logout
    </react_1.Button>);
};
exports.default = Logout;
