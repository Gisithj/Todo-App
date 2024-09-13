import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoPage from './pages/TodoPage';
import Header from './components/Header';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="text-center mt-8">Loading...</div>
  }
  
  return user ? children : <Navigate to="/login" />
};

const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto py-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/todos"
              element={
                <PrivateRoute>
                  <TodoPage />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/todos" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;