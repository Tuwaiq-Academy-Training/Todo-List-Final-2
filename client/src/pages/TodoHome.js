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
const react_1 = require("@chakra-ui/react");
const react_2 = require("react");
const Logout_1 = __importDefault(require("../components/Logout"));
const TodoHome = () => {
    const [todos, setTodos] = (0, react_2.useState)([]);
    const [title, setTitle] = (0, react_2.useState)('');
    const toast = (0, react_1.useToast)();
    const fetchTodos = () => __awaiter(void 0, void 0, void 0, function* () {
        const request = yield fetch('/api/v1/todo', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        const data = yield request.json();
        setTodos(data);
    });
    const addNewTodo = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!title) {
                return;
            }
            const request = yield fetch('/api/v1/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({ title }),
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
            fetchTodos();
            setTitle('');
        }
        catch (error) {
            console.log(error);
            toast({
                title: 'Server Error !',
                status: 'error',
                duration: 3000,
                position: 'top',
            });
        }
    });
    (0, react_2.useEffect)(() => {
        fetchTodos();
    }, []);
    const deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const request = yield fetch(`/api/v1/todo/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
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
            fetchTodos();
        }
        catch (error) {
            console.log(error);
            toast({
                title: 'Server Error !',
                status: 'error',
                duration: 3000,
                position: 'top',
            });
        }
    });
    return (<react_1.Flex justifyContent='center' alignItems='center' height='100vh'>
      <react_1.VStack spacing='3rem'>
        <react_1.Heading>Todo List !</react_1.Heading>
        <react_1.VStack border='1px' padding='10' width='20rem' borderRadius='0.2rem'>
          {todos.map((todo) => (<react_1.HStack overflow='auto' width='100%' key={todo.id} border='1px' padding='3' justifyContent='space-between' borderRadius='0.5rem'>
              <react_1.Text fontSize='1rem'>{todo.title}</react_1.Text>
              <react_1.Button onClick={() => deleteTodo(todo.id)} backgroundColor='red.400'>
                Delete
              </react_1.Button>
            </react_1.HStack>))}

          <react_1.VStack spacing='1rem' mt='2rem !important'>
            <react_1.Divider color='white' backgroundColor='white'/>
            <react_1.Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Add new Todo'/>
            <react_1.Button onClick={addNewTodo} width='100%'>
              Add Todo
            </react_1.Button>
          </react_1.VStack>
        </react_1.VStack>
        <Logout_1.default />
      </react_1.VStack>
    </react_1.Flex>);
};
exports.default = TodoHome;
