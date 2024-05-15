import './CountryList.css';

const countries = [{ id: 1, nombre: 'Colombia' }];

const CountryList = () => {
  return (
    <div>
      <h2>Países</h2>
      <ul className='country-list'>
        {countries.map((country) => (
          <li key={country.id}>{country.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
