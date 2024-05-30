import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar.jsx';
import Actions from './Inversiones/Actions.jsx';
import LoginPage from './Login/Login.jsx';
import HomePage from './Pages/HomePage.jsx';
import Perfil from './Perfil/Perfil.jsx';
import ProteccionRouter from './ProteccionRouter/ProteccionRouter.jsx';
import RegisterPage from './Registro/Registro.jsx';
import './index.css';

function App() {
  // Recuperar el estado de inicio de sesión del usuario de localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [isRegistered, setIsRegistered] = useState(false); // Agrega estado para el registro

  // Función para actualizar el estado de inicio de sesión del usuario y guardar en localStorage
  const handleLogin = (value) => {
    // Cambia el nombre de la función a handleLogin
    setIsLoggedIn(value);
    localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
  };

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} setLoggedIn={handleLogin} /> {/* Utiliza el nuevo nombre de la función */}
      <div className='container'>
        <Routes>
          <Route path='/' element={<HomePage isLoggedIn={isLoggedIn} setLoggedIn={handleLogin} />} />{' '}
          {/* Utiliza el nuevo nombre de la función */}
          <Route path='/login' element={<LoginPage setLoggedIn={handleLogin} />} />{' '}
          {/* Utiliza el nuevo nombre de la función */}
          <Route path='/register' element={<RegisterPage setRegistered={setIsRegistered} />} />{' '}
          {/* Pasa setRegistered como prop */}
          <Route element={<ProteccionRouter isLoggedIn={isLoggedIn} />}>
            <Route path='/acciones' element={<Actions />} /> {/* Utiliza '/acciones' en lugar de '/Acciones' */}
            <Route path='/perfil' element={<Perfil />} />
          </Route>
          <Route path='*' element={<Navigate to={isLoggedIn ? '/acciones' : '/login'} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
