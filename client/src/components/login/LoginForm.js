"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const LoginForm = ({ username, password, submitLogin, setUsername, setPassword, }) => {
    return (<react_1.VStack align='left' spacing='1rem' width='100%'>
      <react_1.Box>
        <react_1.Text>Username</react_1.Text>
        <react_1.Input onChange={(e) => setUsername(e.target.value)} value={username} type='text'/>
      </react_1.Box>
      <react_1.Box>
        <react_1.Text>Password</react_1.Text>
        <react_1.Input onChange={(e) => setPassword(e.target.value)} value={password} type='password'/>
      </react_1.Box>
      <react_1.Button onClick={submitLogin}>Login !</react_1.Button>
    </react_1.VStack>);
};
exports.default = LoginForm;
