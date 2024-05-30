import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../URL.js';
import './Registro.css';
import { countries } from './countries.jsx'; // Importar la lista de países y ciudades

const Register = ({ setRegistered }) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [idNumber, setIdNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [idTelefono, setidTelefono] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [city, setCity] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const goTo = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setError('');

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          idNumber,
          email,
          password,
          confirmPassword,
          idTelefono,
          country,
          city,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Usuario creado:', result.message);
        setSuccess('Usuario creado con éxito');
        alert('Usuario creado con éxito');
        goTo('/login');
        setRegistered(true);
      } else {
        setError(result.error || 'No se pudo crear el usuario');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('Ocurrió un error al registrar el usuario');
    }
  }

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setCity(''); // Resetear la ciudad cuando se cambie el país
  };

  return (
    <div className='register-container'>
      <h2>Registro</h2>
      {error && <div className='error-message'>{error}</div>}
      {success && <div className='success-message'>{success}</div>}
      <form onSubmit={handleRegister} className='register-form'>
        <div className='form-group'>
          <label htmlFor='firstName'>Nombre:</label>
          <input
            type='text'
            id='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Apellido:</label>
          <input
            type='text'
            id='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='idNumber'>Cédula:</label>
          <input
            type='text'
            id='idNumber'
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
            className='form-control'
          />
        </div>
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
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirmar Contraseña:</label>
          <input
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='idTelefono'>Teléfono:</label>
          <input
            type='text'
            id='idTelefono'
            value={idTelefono}
            onChange={(e) => setidTelefono(e.target.value)}
            required
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='country'>País de Origen:</label>
          <select id='country' value={country} onChange={handleCountryChange} required className='form-control'>
            <option value=''>Seleccionar país</option>
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='city'>Ciudad:</label>
          <select
            id='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className='form-control'
            disabled={!country}
          >
            <option value=''>Seleccionar ciudad</option>
            {country &&
              countries[country].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>
        <button type='submit' className='btn btn-primary'>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
