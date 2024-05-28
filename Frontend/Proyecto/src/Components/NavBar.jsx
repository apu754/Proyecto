import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <header className='header-container'>
      <div className='header-title'>Acciones & Gestión S.A.S</div>
      <nav className='nav-bar'>
        <div className='container'>
          <div className='left-links'>
            <Link to='/' className='nav-link'>
              Inicio
            </Link>
            <Link to='/inversiones' className='nav-link'>
              Inversiones
            </Link>
          </div>
          <div className='right-links'>
            <Link to='/login' className='nav-link'>
              Iniciar Sesión
            </Link>
            <Link to='/register' className='nav-link'>
              Registrarse
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
