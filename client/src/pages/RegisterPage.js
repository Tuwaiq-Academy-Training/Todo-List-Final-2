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
exports.RegisterPage = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = require("react");
const react_router_dom_1 = require("react-router-dom");
const RegisterPage = () => {
    const [username, setUsername] = (0, react_2.useState)('');
    const [email, setEmail] = (0, react_2.useState)('');
    const [password, setPassword] = (0, react_2.useState)('');
    const [password2, setPassword2] = (0, react_2.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    const toast = (0, react_1.useToast)();
    const submitRegister = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (password !== password2) {
                toast({
                    title: `You passwords doesn't match`,
                    status: 'error',
                    duration: 3000,
                    position: 'top',
                });
                return;
            }
            const request = yield fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });
            const data = yield request.json();
            if (request.status !== 201) {
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
            navigate('/login');
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
        <react_1.Heading>Register </react_1.Heading>
        <react_1.VStack align='left' spacing='1rem' width='100%'>
          <react_1.Box>
            <react_1.Text>Username</react_1.Text>
            <react_1.Input onChange={(e) => setUsername(e.target.value)} value={username} type='text'/>
          </react_1.Box>
          <react_1.Box>
            <react_1.Text>Email</react_1.Text>
            <react_1.Input onChange={(e) => setEmail(e.target.value)} value={email} type='email'/>
          </react_1.Box>
          <react_1.Box>
            <react_1.Text>Password</react_1.Text>
            <react_1.Input onChange={(e) => setPassword(e.target.value)} value={password} type='password'/>
          </react_1.Box>
          <react_1.Box>
            <react_1.Text>Confirm Password</react_1.Text>
            <react_1.Input onChange={(e) => setPassword2(e.target.value)} value={password2} type='password'/>
          </react_1.Box>
          <react_1.Button onClick={submitRegister}>Register !</react_1.Button>
        </react_1.VStack>
        <react_1.HStack>
          <react_1.Text>Already have account ?</react_1.Text>
          <react_router_dom_1.Link to='/login'>Login</react_router_dom_1.Link>
        </react_1.HStack>
      </react_1.VStack>
    </react_1.Flex>);
};
exports.RegisterPage = RegisterPage;
