import './CountryList.css';

const investments = [
  { id: 1, tipo: 'oro', nombre: 'Oro', precio: '$1800/oz', grafico: 'gold-chart-placeholder.png' },
  { id: 2, tipo: 'inversion', nombre: 'USOUSD', precio: '$70/bbl', grafico: 'uso-chart-placeholder.png' },
  { id: 3, tipo: 'inversion', nombre: 'AAPL', precio: '$150', grafico: 'aapl-chart-placeholder.png' },
  { id: 4, tipo: 'inversion', nombre: 'GOOGL', precio: '$2500', grafico: 'googl-chart-placeholder.png' },
  { id: 5, tipo: 'inversion', nombre: 'AMZN', precio: '$3300', grafico: 'amzn-chart-placeholder.png' },
  { id: 6, tipo: 'inversion', nombre: 'BTC', precio: '$60000', grafico: 'btc-chart-placeholder.png' },
  { id: 7, tipo: 'inversion', nombre: 'ETH', precio: '$2500', grafico: 'eth-chart-placeholder.png' },
  { id: 8, tipo: 'inversion', nombre: 'TSLA', precio: '$700', grafico: 'tsla-chart-placeholder.png' },
  { id: 9, tipo: 'inversion', nombre: 'NFLX', precio: '$500', grafico: 'nflx-chart-placeholder.png' },
  { id: 10, tipo: 'inversion', nombre: 'SPY', precio: '$400', grafico: 'spy-chart-placeholder.png' },
];

const CountryList = () => {
  return (
    <div className='country-container'>
      <h2>Inversiones</h2>
      <ul className='country-list'>
        {investments.map((item) => (
          <li key={item.id} className='country-item'>
            <h3>{item.nombre}</h3>
            {item.tipo !== 'pais' && (
              <div>
                <p>Precio: {item.precio}</p>
                <div className='country-chart'>
                  <img src={item.grafico} alt={`Gráfico de ${item.nombre}`} />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
