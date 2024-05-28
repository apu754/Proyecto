import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar.jsx';
import Inversiones from './Inversiones/Inversiones.jsx'; // Cambia Dashboard por Inversiones
import LoginPage from './Login/Login.jsx';
import HomePage from './Pages/HomePage.jsx';
import Perfil from './Perfil/Perfil.jsx';
import ProteccionRouter from './ProteccionRouter/ProteccionRouter.jsx';
import RegisterPage from './Registro/Registro.jsx';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn} />
      <div className='container'>
        <Routes>
          <Route path='/' element={<HomePage isLoggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn} />} />
          <Route path='/login' element={<LoginPage setLoggedIn={setIsLoggedIn} />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route element={<ProteccionRouter isLoggedIn={isLoggedIn} />}>
            <Route path='/inversiones' element={<Inversiones />} />
            <Route path='/perfil' element={<Perfil />} />
          </Route>
          <Route path='*' element={<Navigate to={isLoggedIn ? '/inversiones' : '/login'} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
