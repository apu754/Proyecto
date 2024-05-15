import './UserList.css';

const users = [{ id: 1, nombre: 'Juan Perez', email: 'juan.perez@example.com' }];

const UserList = () => {
  return (
    <div>
      <h2>Usuarios</h2>
      <ul className='user-list'>
        {users.map((user) => (
          <li key={user.id}>
            <span className='user-name'>{user.nombre}</span>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
