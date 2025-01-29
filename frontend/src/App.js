import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import Home from "./Pages/Home.jsx";
import { UserProvider } from './UserContext/userContext.js';
function App() {
  return (
    <UserProvider>
    <Router>
    <div className="App">
    
    <Routes> 
      <Route path="/" element={<Register />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    </div>
    </Router>
    </UserProvider>
  );
}

export default App;
