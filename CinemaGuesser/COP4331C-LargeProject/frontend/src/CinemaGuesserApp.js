import React from 'react';
import LoginPage from './pages/LoginPage';
import Nav from './components/Nav';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';

function CinemaGuesserApp() {
  return (
    <>
      <Nav />
      <Routes>
        {/* Add more paths here */}
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/game' element={<GamePage />} />
        <Route path='/home' element={<HomePage />} />
        {/* For unknown path go to login page*/}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default CinemaGuesserApp;
