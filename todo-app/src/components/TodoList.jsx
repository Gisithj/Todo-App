import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import { 
  Container, 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  List, 
  Paper
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const { user } = useAuth();

//todo item functions addTodo, toggleTodo, editTodo, deleteTodo
  const addTodo = (newTodo) => {
    setTodos([...todos, { ...newTodo, id: Date.now(), completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (id, newTitle, newDescription) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle, description: newDescription } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const incompleteTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  //function to get todos by tab
  const getTodosByTab = () => {
    switch (tabValue) {
      case 0:
        return incompleteTodos;
      case 1:
        return completedTodos;
      default:
        return todos;
    }
  };

  //populate the tab with todos
  const todosToDisplay = getTodosByTab();

    //useEffect to store and retreived todos in local storage
    useEffect(() => {
        if (user) {
        const storedTodos = JSON.parse(localStorage.getItem(`todos_${user.id}`) || '[]');
        setTodos(storedTodos);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            if (todos.length === 0) {
                localStorage.getItem(`todos_${user.id}`);

            } else {
                localStorage.setItem(`todos_${user.id}`, JSON.stringify(todos));
            }
        }
    }, [todos, user]);
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" align="center">
          Todo List
        </Typography>
        <AddTodoForm addTodo={addTodo} />
        <Paper sx={{ mt: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Active" />
            <Tab label="Completed" />
          </Tabs>
        </Paper>
        <List sx={{ mt: 2 }}>
        {todosToDisplay.length > 0 ? (
            todosToDisplay.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
              />
            ))
          ) : (
            <Typography variant="h6" component="p" align="center">
              No todos found
            </Typography>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default TodoList;