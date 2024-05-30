import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Login from '../Login/Login.jsx';
import { API_URL } from '../URL.js';
import inversion from '../assets/005800_1420044.jpg';
import './HomePage.css';

// Importa las imágenes de las inversiones

import btcImage from '../assets/Bitcoin.svg.webp';
import spyImage from '../assets/SPY.png';
import amznImage from '../assets/amazon.png';
import aaplImage from '../assets/apple.png';
import ethImage from '../assets/ethereum.jpg';
import googlImage from '../assets/google.jpg';
import nflxImage from '../assets/nflx.png';
import oroImage from '../assets/oro.jpg';
import tslaImage from '../assets/tesla--600.png';
import usoUsdImage from '../assets/usd.jpg';
// Importa las demás imágenes necesarias

const HomePage = ({ isLoggedIn, setLoggedIn }) => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const fetchAllActions = async () => {
      try {
        const response = await fetch(`${API_URL}/action/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch actions');
        }
        const data = await response.json();
        // Verificar si los datos recibidos son un array
        if (Array.isArray(data)) {
          setActions(data);
        } else {
          console.error('Error: Data received is not an array');
        }
      } catch (error) {
        console.error('Error fetching all actions:', error);
      }
    };

    fetchAllActions();
  }, []);

  // Objeto que mapea el nombre de la inversión con la ruta de la imagen
  const investmentImages = {
    oro: oroImage,
    usoUsd: usoUsdImage,
    aapl: aaplImage,
    googl: googlImage,
    amzn: amznImage,
    btc: btcImage,
    eth: ethImage,
    tsla: tslaImage,
    nflx: nflxImage,
    spy: spyImage,
    // Agrega los demás tipos de inversión y sus imágenes
  };

  return (
    <div className='home-page container'>
      <div className='home-welcome'>
        <div className='home-welcome-content'>
          <h1>Bienvenido a Acciones & Gestión S.A.S</h1>
          {isLoggedIn && <img src={inversion} alt='Imagen de bienvenida' />}
        </div>
        {!isLoggedIn && (
          <div className='home-login'>
            <Login setLoggedIn={setLoggedIn} />
          </div>
        )}
      </div>

      <div className='home-investments'>
        <h2>Últimas inversiones</h2>
        <ul className='country-list'>
          {actions.map((action) => (
            <li key={action._id} className='country-item'>
              <h3>{action.name}</h3>
              <p>Valor en Dólares: {action.valueInDollars}</p>
              {/* Verificar si action.country está definido antes de acceder a su propiedad name */}
              <p>País: {action.country?.name}</p>
              {/* Mostrar la imagen correspondiente a la inversión */}
              <img
                src={investmentImages[action.name.toLowerCase()]}
                alt={action.name}
                style={{ width: '150px', height: '150px' }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
};

export default HomePage;
