import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar.jsx';
import Actions from './Inversiones/Actions.jsx';
import LoginPage from './Login/Login.jsx';
import HomePage from './Pages/HomePage.jsx';
import Perfil from './Perfil/Perfil.jsx';
import PurchasedActions from './Perfil/PurchasedActions.jsx';
import ProteccionRouter from './ProteccionRouter/ProteccionRouter.jsx';
import RegisterPage from './Registro/Registro.jsx';
import './index.css';

function App() {
  // Recuperar el estado de inicio de sesión del usuario de localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  // Función para actualizar el estado de inicio de sesión del usuario y guardar en localStorage
  const handleLogin = (value) => {
    setIsLoggedIn(value);
    localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
  };

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} setLoggedIn={handleLogin} />
      <div className='container'>
        <Routes>
          <Route path='/' element={<HomePage isLoggedIn={isLoggedIn} setLoggedIn={handleLogin} />} />
          <Route path='/login' element={<LoginPage setLoggedIn={handleLogin} />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/acciones-compradas' element={<PurchasedActions />} />
          <Route element={<ProteccionRouter isLoggedIn={isLoggedIn} />}>
            <Route path='/acciones' element={<Actions />} />
            <Route path='/perfil' element={<Perfil />} />
          </Route>
          <Route path='*' element={<Navigate to={isLoggedIn ? '/acciones' : '/login'} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
