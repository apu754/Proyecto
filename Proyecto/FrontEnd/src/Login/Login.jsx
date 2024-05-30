import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../URL';
import './Login.css';

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.data) {
          setLoggedIn(true);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userId', result.data.user.id); // Almacenar el ID del usuario
          localStorage.setItem('accessToken', result.data.accessToken); // Almacenar el token de acceso
          navigate('/perfil'); // Redirigir al perfil
        } else {
          setError('La respuesta del servidor no es válida.');
        }
      } else {
        setError(result.data?.message || 'Correo electrónico o contraseña incorrectos');
      }
    } catch (error) {
      setError('Ocurrió un error al iniciar sesión. Inténtelo de nuevo más tarde.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='login-container'>
      <h2>Iniciar sesión</h2>
      {error && <div className='error-message'>{error}</div>}
      <form onSubmit={handleLogin} className='login-form'>
        <div className='form-group'>
          <label htmlFor='email'>Correo electrónico:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Contraseña:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='form-control'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setLoggedIn: PropTypes.func.isRequired,
};

export default Login;
