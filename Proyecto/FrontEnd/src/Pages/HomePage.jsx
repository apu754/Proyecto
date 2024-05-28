import PropTypes from 'prop-types';
import CountryList from '../Components/CountryList.jsx';
import Login from '../Login/Login.jsx';
import './HomePage.css';

const HomePage = ({ isLoggedIn, setLoggedIn }) => {
  return (
    <div className='home-page container'>
      <div className='home-welcome'>
        <div className='home-welcome-content'>
          <h1>Bienvenido a Acciones & Gestión S.A.S</h1>
          <p></p>
        </div>
        {!isLoggedIn && (
          <div className='home-login'>
            <Login setLoggedIn={setLoggedIn} />
          </div>
        )}
      </div>

      <div className='home-investments'>
        <h2>Últimas inversiones</h2>
        <CountryList />
      </div>
    </div>
  );
};

HomePage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
};

export default HomePage;
