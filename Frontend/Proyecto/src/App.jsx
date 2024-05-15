import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar.jsx';
import Login from './Login/Login.jsx';
import ActionPage from './Pages/ActionPage.jsx';
import HomePage from './Pages/HomePage.jsx';
import UserPage from './Pages/UserPage.jsx';
import './index.css';

function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <div className='container'>
        <Routes>
          <Route path='/' element={isLoggedIn ? <HomePage /> : <Login setLoggedIn={setLoggedIn} />} />
          <Route path='/users' element={isLoggedIn ? <UserPage /> : <Login setLoggedIn={setLoggedIn} />} />
          <Route path='/actions' element={isLoggedIn ? <ActionPage /> : <Login setLoggedIn={setLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
