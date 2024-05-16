import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './HomePage.css';

const HomePage = () => {
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

  return (
    <div className='home-page container'>
      <div className='home-welcome'>
        <div className='home-welcome-content'>
          <h1>Bienvenido a Acciones & Gestión S.A.S</h1>
          <p>Descubre las últimas tendencias del mercado financiero y gestiona tus inversiones de manera eficaz.</p>
        </div>
      </div>

      <div className='home-carousel'>
        <Carousel showArrows={true} showStatus={false} showIndicators={false} showThumbs={false}>
          {investments.map((investment) => (
            <div key={investment.id}>
              <h2>{investment.nombre}</h2>
              <p>{investment.precio}</p>
              <img src={investment.grafico} alt={investment.nombre} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HomePage;
