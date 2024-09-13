import React from 'react';
import TodoList from '../components/TodoList';
import { useAuth } from '../contexts/AuthContext';
import { Typography } from '@mui/material';
const TodoPage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
        <Typography variant="h5" component="h5" fontWeight={800} gutterBottom align="center">
        Welcome, {user.name}!
        </Typography>
      <TodoList />
    </div>
  );
};

export default TodoPage;