import React, { useState } from 'react';
import { 
  ListItem, 
  ListItemText, 
  Checkbox, 
  IconButton, 
  TextField,
  Box,
  Paper
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Save as SaveIcon, 
  Cancel as CancelIcon 
} from '@mui/icons-material';

const TodoItem = ({ todo, toggleTodo, editTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleEdit = () => {
    editTodo(todo.id, editedTitle, editedDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
    setIsEditing(false);
  };

  return (
    <Paper elevation={1} sx={{ mb: 2 }}>
      <ListItem>
        <Checkbox
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          sx={{ mr: 2 }}
        />
        {isEditing ? (
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
            <TextField
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              size="small"
            />
          </Box>
        ) : (
          <ListItemText
            primary={todo.title}
            secondary={todo.description}
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              opacity: todo.completed ? 0.6 : 1,
            }}
          />
        )}
        {isEditing ? (
          <>
            <IconButton onClick={handleEdit} color="primary">
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCancel} color="secondary">
              <CancelIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={() => setIsEditing(true)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteTodo(todo.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </ListItem>
    </Paper>
  );
};

export default TodoItem;