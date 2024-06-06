import { useEffect, useState } from 'react';
import { API_URL } from '../URL';
import './Perfil.css'; // Importa el archivo CSS para los estilos

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [newBalance, setNewBalance] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/perfil`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const result = await response.json();

        if (response.ok) {
          setUser(result);
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (userId && accessToken) {
      fetchUserProfile();
    }
  }, []);

  const handleUpdateBalance = async () => {
    if (!password) {
      setErrorMessage('Por favor ingresa tu contraseña.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/perfil/actualizarSaldo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ newBalance: parseFloat(newBalance), password }),
      });

      if (response.ok) {
        const result = await response.json();
        setUser(result);
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
      }
    } catch (error) {
      console.error('Error updating balance:', error);
      setErrorMessage('Error en el servidor');
    }
  };

  return (
    <div className='profile-container'>
      <h1>Perfil del Usuario</h1>
      {user ? (
        <div className='profile-content'>
          <p>
            <strong>Nombre:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {user.idTelefono}
          </p>
          <p>
            <strong>País:</strong> {user.country}
          </p>
          <p>
            <strong>Ciudad:</strong> {user.city}
          </p>
          <p>
            <strong>Saldo:</strong> {user.balance}
          </p>
          <button className='investment-button' onClick={() => setIsModalOpen(true)}>
            Actualizar Saldo
          </button>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2>Actualizar Saldo</h2>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <input
              type='number'
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              placeholder='Nuevo Saldo'
            />
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Contraseña'
            />
            <button className='investment-button' onClick={handleUpdateBalance}>
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
