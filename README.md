# React Todo Application with Authentication

This project is a simple React application that includes user authentication (sign-up and login) and a todo list feature. The application is built using modern React practices, including hooks, context, and client-side routing.

## Features

- **User Authentication**: Registration and login without a backend, managed by React context.
- **Todo List**: Users can add, edit, delete, and mark todos as completed or not completed.
- **Client-Side Routing**: Login, register, and todo pages are separated using React Router.
- **Persistent Storage**: Todos persist across page reloads using `localStorage`.
- **Form Validation**: Form validation is handled using Formik and Yup.
- **Responsive Design**: The application is responsive and works well on both desktop and mobile devices.

## Tech Stack

- **React**: JavaScript library for building user interfaces
- **React Router**: Client-side routing
- **Formik**: Form handling
- **Yup**: Form validation
- **Context API**: For managing global state (authentication)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Gisithj/Todo-App.git
    cd todo-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

## Usage

1. **Authentication**: Users need to register or log in to access the todo list.
2. **Todo List**: Once logged in, users can manage their todo items.
3. **User login state and todos are persisting when page reloads until the user logout.

## Project Structure

- `src/components`: Contains reusable UI components (forms, todo list).
- `src/contexts`: Manages global state (authentication).
- `src/pages`: Contains route components like `Login`, `Register`, and `TodoPage`.

