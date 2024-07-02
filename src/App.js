import { useState } from 'react';
import './App.css';
import { NavBar, ProtectedRoute, NotFound404 } from './components';
import { Login, HomePage } from './views';
import { Route, Routes } from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="home" element={<ProtectedRoute isAuthenticated={isAuthenticated}><HomePage /></ProtectedRoute>} />
      <Route path="dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><NavBar /></ProtectedRoute>} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}

export default App;
