import { useEffect, useState } from 'react';
import { API_URL } from '../URL.js';

const Actions = () => {
  const [actions, setActions] = useState([]);
  const [userCountry, setUserCountry] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch(`${API_URL}/perfil`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const result = await response.json();

        if (response.ok) {
          setUserCountry(result.country);
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await fetch(`${API_URL}/action?country=${userCountry}`);
        const result = await response.json();
        setActions(result);
      } catch (error) {
        console.error('Error fetching actions:', error);
      }
    };

    if (userCountry) {
      fetchActions();
    }
  }, [userCountry]);

  return (
    <div>
      <h2>Acciones para {userCountry}</h2>
      <ul>
        {actions.map((action) => (
          <li key={action._id}>
            <h3>{action.name}</h3>
            <p>Valor en Dólares: {action.valueInDollars}</p>
            {action.country && <p>País: {action.country.name}</p>} {/* Agregar control de flujo aquí */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Actions;
