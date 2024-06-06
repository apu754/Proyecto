import { useEffect, useState } from 'react';
import { API_URL } from '../URL.js';
import './PurchasedActions.css';

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

const PurchasedActions = () => {
  const [purchasedActions, setPurchasedActions] = useState([]);

  useEffect(() => {
    const fetchPurchasedActions = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/purchasedActions`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const result = await response.json();

        if (response.ok) {
          setPurchasedActions(result);
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error('Error fetching purchased actions:', error);
      }
    };

    fetchPurchasedActions();
  }, []);

  const handleSellAction = async (actionId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/sellAction`, {
        // Modifica la URL aquí
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json', // Asegúrate de incluir el tipo de contenido
        },
        body: JSON.stringify({ actionId }), // Envía el ID de la acción en el cuerpo de la solicitud
      });

      if (response.ok) {
        // Si la venta es exitosa, actualiza la lista de acciones
        const updatedActions = purchasedActions.filter((action) => action._id !== actionId);
        setPurchasedActions(updatedActions);
        alert('La acción ha sido vendida exitosamente.');
      } else {
        const error = await response.json();
        alert(`Error al vender la acción: ${error.message}`);
      }
    } catch (error) {
      console.error('Error al vender la acción:', error);
      alert('Error al vender la acción. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div>
      <h2>Acciones Compradas</h2>
      <ul className='purchased-actions-list'>
        {purchasedActions.map((action) => (
          <li key={action._id} className='purchased-action-item'>
            <h3>{action.name}</h3>
            <p>Valor en Dólares: {action.valueInDollars}</p>
            {action.country && <p>País: {action.country.name}</p>}
            <img src={investmentImages[action.name.toLowerCase()]} alt={action.name} className='investment-image' />
            <button onClick={() => handleSellAction(action._id)}>Vender Acción</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchasedActions;
