"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = require("@chakra-ui/react");
const react_router_dom_1 = require("react-router-dom");
const ProtectedRoute_1 = __importDefault(require("./components/ProtectedRoute"));
const LoginPage_1 = require("./pages/LoginPage");
const RegisterPage_1 = require("./pages/RegisterPage");
const TodoHome_1 = __importDefault(require("./pages/TodoHome"));
const App = () => {
    return (<react_router_dom_1.BrowserRouter>
      <react_1.ChakraProvider theme={react_1.theme}>
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path='/login' element={<LoginPage_1.LoginPage />}/>
          <react_router_dom_1.Route path='/register' element={<RegisterPage_1.RegisterPage />}/>
          <react_router_dom_1.Route element={<ProtectedRoute_1.default />}>
            <react_router_dom_1.Route path='/' element={<TodoHome_1.default />}/>
          </react_router_dom_1.Route>
        </react_router_dom_1.Routes>
      </react_1.ChakraProvider>
    </react_router_dom_1.BrowserRouter>);
};
exports.App = App;
