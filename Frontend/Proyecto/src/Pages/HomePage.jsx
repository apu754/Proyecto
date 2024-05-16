import React from 'react';
import CountryList from '../Components/CountryList.jsx';
import Login from '../Login/Login.jsx';
import './HomePage.css';

const HomePage = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className='home-page container'>
      <div className='home-welcome'>
        <div className='home-welcome-content'>
          <h1>Bienvenido a Acciones & Gestión S.A.S</h1>
          <p>Descubre las últimas tendencias del mercado financiero y gestiona tus inversiones de manera eficaz.</p>
        </div>
        <div className='home-login'>
          <Login setLoggedIn={setLoggedIn} />
        </div>
      </div>

      <div className='home-investments'>
        <h2>Últimas inversiones</h2>
        <CountryList />
      </div>
    </div>
  );
};

export default HomePage;
