import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCrypto } from './store';
import chart7d from './assets/7d.png';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const cryptos = useSelector((state) => state.crypto.cryptos);

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newPrice = parseFloat(data.p);
      const id = cryptos.find((c) => c.symbol === 'BTC')?.id;
      if (id) {
        dispatch(updateCrypto({
          id,
          price: newPrice,
          change1h: +(Math.random() * 2 - 1).toFixed(2),
          change24h: +(Math.random() * 4 - 2).toFixed(2),
          change7d: +(Math.random() * 10 - 5).toFixed(2),
          volume24h: Math.floor(Math.random() * 5000000),
        }));
      }
    };

    return () => socket.close();
  }, [dispatch, cryptos]);

  const sortedCryptos = [...cryptos].sort((a, b) => b.price - a.price); // Auto-sort by price

  useEffect(() => {
    localStorage.setItem('cryptos', JSON.stringify(cryptos));
  }, [cryptos]);

  useEffect(() => {
    const savedCryptos = localStorage.getItem('cryptos');
    if (savedCryptos) {
      try {
        const parsed = JSON.parse(savedCryptos);
        dispatch(updateCrypto(parsed));
      } catch (err) {
        console.error("Error parsing saved cryptos:", err);
      }
    }
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Crypto Price Tracker</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>Volume(24h)</th>
            <th>Circulating Supply</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {sortedCryptos.map((crypto, idx) => (
            <tr key={crypto.id}>
              <td>☆</td>
              <td>{idx + 1}</td>
              <td style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <img
                  src={crypto.logo.startsWith('/') ? process.env.PUBLIC_URL + crypto.logo : crypto.logo}
                  alt={crypto.symbol}
                  width="24"
                  height="24"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/24')}
                />
                <strong>{crypto.name}</strong>&nbsp;
                <span style={{ color: '#777' }}>{crypto.symbol}</span>
              </td>

              <td>${crypto.price?.toLocaleString() || 'N/A'}</td>
              <td className={crypto.change1h >= 0 ? 'green' : 'red'}>
                {crypto.change1h}%
              </td>
              <td className={crypto.change24h >= 0 ? 'green' : 'red'}>
                {crypto.change24h}%
              </td>
              <td className={crypto.change7d >= 0 ? 'green' : 'red'}>
                {crypto.change7d}%
              </td>
              <td>${crypto.marketCap.toLocaleString()}</td>
              <td>${crypto.volume24h.toLocaleString()}</td>
              <td>{crypto.circulatingSupply}</td>
              <td>
              <img src={chart7d} alt="7D Chart" className="sparkline-chart" />
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
