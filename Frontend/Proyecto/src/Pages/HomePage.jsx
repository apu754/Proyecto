import CountryList from '../Components/CountryList.jsx';
import UserList from '../Components/UserList.jsx';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className='home-page container'>
      <h1>Acciones & Gestión S.A.S</h1>
      <UserList />
      <CountryList />
    </div>
  );
};

export default HomePage;
