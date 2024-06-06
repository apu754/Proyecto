import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../URL.js';
import './Actions.css';
import Modal from './Brokers.jsx'; // Asegúrate de importar el componente modal correctamente

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

const Actions = () => {
  const [actions, setActions] = useState([]);
  const [userCountry, setUserCountry] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

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
          setUser(result);
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

  const fetchBrokersForAction = async (actionId) => {
    try {
      const response = await fetch(`${API_URL}/brokers/action/${actionId}`);
      const brokers = await response.json();
      return brokers;
    } catch (error) {
      console.error('Error fetching brokers for action:', error);
      return [];
    }
  };

  const handleBuyClick = async (action) => {
    const brokers = await fetchBrokersForAction(action._id);
    setSelectedAction({ ...action, brokers });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAction(null);
  };

  const handleConfirmPurchase = async (selectedBrokerId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${API_URL}/purchase`,
        {
          actionId: selectedAction._id,
          brokerId: selectedBrokerId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Compra realizada con éxito');
        // Actualizar el estado del balance del usuario
        setUser(response.data.user);
      } else {
        if (response.data.error === 'Saldo insuficiente') {
          alert('Saldo insuficiente');
        } else {
          console.error(response.data.error);
          alert('Error realizando la compra: ' + response.data.error);
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error === 'Saldo insuficiente') {
        alert('Saldo insuficiente');
      } else {
        console.error('Error realizando la compra:', error);
        alert('Error realizando la compra');
      }
    } finally {
      setShowModal(false);
      setSelectedAction(null);
    }
  };

  const investmentImages = {
    oro: oroImage,
    usousd: usoUsdImage,
    aapl: aaplImage,
    googl: googlImage,
    amzn: amznImage,
    btc: btcImage,
    eth: ethImage,
    tsla: tslaImage,
    nflx: nflxImage,
    spy: spyImage,
  };

  return (
    <div>
      <h2>Acciones para {user && user.country}</h2>
      <ul className='country-list'>
        {actions.map((action) => (
          <li key={action._id} className='country-item'>
            <h3>{action.name}</h3>
            <p>Valor en Dólares: {action.valueInDollars}</p>
            {action.country && <p>País: {action.country.name}</p>}
            <img src={investmentImages[action.name.toLowerCase()]} alt={action.name} className='investment-image' />
            <button className='investment-button' onClick={() => handleBuyClick(action)}>
              Comprar inversión
            </button>
          </li>
        ))}
      </ul>
      {showModal && (
        <Modal
          action={selectedAction}
          brokers={selectedAction.brokers}
          onClose={handleModalClose}
          onConfirm={handleConfirmPurchase}
        />
      )}
    </div>
  );
};

export default Actions;
