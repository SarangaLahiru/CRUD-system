import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={ <Login/>} />
        <Route path="/signup" element={ <Signup/>} />
        <Route path="/dashboard" element={< Dashboard />} />
        
      </Routes>
    </Router>
  );
};

export default App;