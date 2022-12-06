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
exports.LoginPage = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = require("react");
const react_router_dom_1 = require("react-router-dom");
const LoginForm_1 = __importDefault(require("../components/login/LoginForm"));
const LoginPage = () => {
    const [username, setUsername] = (0, react_2.useState)('');
    const [password, setPassword] = (0, react_2.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    const toast = (0, react_1.useToast)();
    const submitLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const request = yield fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = yield request.json();
            if (request.status !== 200) {
                toast({
                    title: data.message,
                    status: 'error',
                    duration: 3000,
                    position: 'top',
                });
                return;
            }
            toast({
                title: data.message,
                status: 'success',
                duration: 3000,
                position: 'top',
            });
            localStorage.setItem('token', data.token);
            navigate('/');
        }
        catch (error) {
            toast({
                title: 'Server Error !',
                status: 'error',
                duration: 3000,
                position: 'top',
            });
        }
    });
    return (<react_1.Flex justifyContent='center' alignItems='center' height='100vh'>
      <react_1.VStack spacing='2rem' width='20rem'>
        <react_1.Heading>Login </react_1.Heading>
        <LoginForm_1.default username={username} setUsername={setUsername} setPassword={setPassword} password={password} submitLogin={submitLogin}/>
        <react_1.HStack>
          <react_1.Text>You don't have account ? </react_1.Text>
          <react_router_dom_1.Link to='/register'>Register</react_router_dom_1.Link>
        </react_1.HStack>
      </react_1.VStack>
    </react_1.Flex>);
};
exports.LoginPage = LoginPage;
