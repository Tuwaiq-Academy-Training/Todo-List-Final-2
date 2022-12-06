import {
  Box,
  Flex,
  VStack,
  Text,
  Heading,
  Input,
  Divider,
  Button,
  useToast,
  HStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Logout from '../components/Logout';

const TodoHome = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const toast = useToast();
  const fetchTodos = async () => {
    const request = await fetch('/api/v1/todo', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    const data = await request.json();
    setTodos(data);
  };
  const addNewTodo = async () => {
    try {
      if (!title) {
        return;
      }

      const request = await fetch('/api/v1/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({ title }),
      });

      const data = await request.json();

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
    } catch (error) {
      console.log(error);
      toast({
        title: 'Server Error !',
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id: string) => {
    try {
      const request = await fetch(`/api/v1/todo/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      const data = await request.json();

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
    } catch (error) {
      console.log(error);
      toast({
        title: 'Server Error !',
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    }
  };

  return (
    <Flex justifyContent='center' alignItems='center' height='100vh'>
      <VStack spacing='3rem'>
        <Heading>Todo List !</Heading>
        <VStack border='1px' padding='10' width='20rem' borderRadius='0.2rem'>
          {todos.map((todo: any) => (
            <HStack
              overflow='auto'
              width='100%'
              key={todo.id}
              border='1px'
              padding='3'
              justifyContent='space-between'
              borderRadius='0.5rem'
            >
              <Text fontSize='1rem'>{todo.title}</Text>
              <Button
                onClick={() => deleteTodo(todo.id)}
                backgroundColor='red.400'
              >
                Delete
              </Button>
            </HStack>
          ))}

          <VStack spacing='1rem' mt='2rem !important'>
            <Divider color='white' backgroundColor='white' />
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Add new Todo'
            />
            <Button onClick={addNewTodo} width='100%'>
              Add Todo
            </Button>
          </VStack>
        </VStack>
        <Logout />
      </VStack>
    </Flex>
  );
};

export default TodoHome;
