import { useEffect, useState } from 'react';
import { API_URL } from '../URL';

const Perfil = () => {
  const [user, setUser] = useState(null);

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

  return (
    <div>
      <h1>Perfil del Usuario</h1>
      {user ? (
        <div>
          <p>
            Bienvenido, {user.firstName} {user.lastName}!
          </p>
          <p>Email: {user.email}</p>
          <p>Teléfono: {user.idTelefono}</p>
          <p>País: {user.country}</p>
          <p>Ciudad: {user.city}</p>
          <p>Saldo: {user.balance}</p> {/* Mostrar el balance del usuario */}
          {/* Aquí puedes añadir más contenido del perfil del usuario */}
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default Perfil;
