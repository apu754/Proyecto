import UserList from '../Components/UserList.jsx';
import './UserPage.css';

const UserPage = () => {
  return (
    <div className='user-page container'>
      <h1>Usuarios</h1>
      <UserList />
    </div>
  );
};

export default UserPage;
