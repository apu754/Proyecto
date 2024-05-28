import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ isLoggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedIn(false);

    navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
  };

  return (
    <header className='header-container'>
      <div className='header-title'>Acciones & Gestión S.A.S</div>
      <nav className='nav-bar'>
        <div className='container'>
          <div className='left-links'>
            <Link to='/' className='nav-link'>
              Inicio
            </Link>
            {isLoggedIn && (
              <Link to='/inversiones' className='nav-link'>
                Inversiones
              </Link>
            )}
          </div>
          <div className='right-links'>
            {!isLoggedIn && (
              <>
                <Link to='/login' className='nav-link'>
                  Iniciar Sesión
                </Link>
                <Link to='/register' className='nav-link'>
                  Registrarse
                </Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Link to='/perfil' className='nav-link'>
                  Perfil
                </Link>
                <button onClick={handleLogout} className='nav-link btn-link'>
                  Cerrar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
};

export default NavBar;
