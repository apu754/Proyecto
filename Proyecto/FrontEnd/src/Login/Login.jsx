import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const users = [
    { email: 'user1@example.com', password: 'password1' },
    { email: 'user2@example.com', password: 'password2' },
    { email: 'user3@example.com', password: 'password3' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setLoggedIn(true);
      navigate('/'); // Redirigir al usuario a la página principal
    } else {
      setError('Correo electrónico o contraseña incorrectos');
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
