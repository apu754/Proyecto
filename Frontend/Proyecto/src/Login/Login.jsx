import PropTypes from 'prop-types';
import React from 'react';
import './Login.css';

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const users = [
    { email: 'user1@example.com', password: 'password1' },
    { email: 'user2@example.com', password: 'password2' },
    { email: 'user3@example.com', password: 'password3' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    // Verificar las credenciales
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      // Credenciales válidas, establecer el estado de inicio de sesión en verdadero
      setLoggedIn(true); // Llamando a la función setLoggedIn con el valor true
      // Redireccionar al usuario a la página de inicio
    } else {
      // Credenciales inválidas, mostrar un mensaje de error
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
