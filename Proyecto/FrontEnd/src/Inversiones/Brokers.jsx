import PropTypes from 'prop-types';
import { useState } from 'react';
import './Brokers.css';

const Modal = ({ action, brokers, onClose, onConfirm }) => {
  const [selectedBrokerId, setSelectedBrokerId] = useState(null);

  const handleConfirm = () => {
    onConfirm(selectedBrokerId);
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h3>Seleccione un broker para {action.name}</h3>
        <ul>
          {brokers.map((broker) => (
            <li key={broker._id}>
              <input
                type='radio'
                id={broker._id}
                name='broker'
                value={broker._id}
                onChange={() => setSelectedBrokerId(broker._id)}
              />
              <label htmlFor={broker._id}>{broker.name}</label>
            </li>
          ))}
        </ul>
        <div className='button-group'>
          <button onClick={handleConfirm} disabled={!selectedBrokerId}>
            Confirmar Compra
          </button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  action: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  brokers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Modal;
