import React from "react";
import Login from './components/Login.jsx';
import './App.css';
import Success from './components/Success.jsx';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path='/success' element={<Success />} />'
      </Routes>
    </>
  );
}
export default App;
