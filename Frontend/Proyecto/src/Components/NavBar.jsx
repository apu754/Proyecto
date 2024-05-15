import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className='nav-bar'>
      <div className='container'>
        <Link to='/'>Inicio</Link>
        <Link to='/users'>Usuarios</Link>
        <Link to='/actions'>Acciones</Link>
      </div>
    </nav>
  );
};

export default NavBar;
