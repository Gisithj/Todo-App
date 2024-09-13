import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Fab,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
});

const AddTodoForm = ({ addTodo }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Todo</DialogTitle>
        <Formik
          initialValues={{ title: '', description: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            addTodo(values);
            resetForm();
            handleClose();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Field
                    name="title"
                    as={TextField}
                    label="Title"
                    fullWidth
                    error={touched.title && errors.title}
                    helperText={touched.title && errors.title}
                  />
                  <Field
                    name="description"
                    as={TextField}
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    error={touched.description && errors.description}
                    helperText={touched.description && errors.description}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Add Todo
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default AddTodoForm;