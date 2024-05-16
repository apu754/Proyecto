// import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar.jsx';
import ActionPage from './Pages/ActionPage.jsx';
import HomePage from './Pages/HomePage.jsx';

import LoginPage from './Login/Login.jsx';
import './index.css';

function App() {
  return (
    <Router>
      <NavBar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/actions' element={<ActionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
