import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cryptos: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 93759.48,
      change1h: 0.43,
      change24h: 0.93,
      change7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      circulatingSupply: '19.85M BTC',
      logo: "/images/bitcoin-logo.png",
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      price: 1802.46,
      change1h: 0.60,
      change24h: 3.21,
      change7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      circulatingSupply: '120.71M ETH',
      logo: "/images/Ethereum-logo.png",
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      price: 1.00,
      change1h: 0.00,
      change24h: 0.00,
      change7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      circulatingSupply: '145.27B USDT',
      logo: "/images/tether-logo.png",
    },
    {
      id: 4,
      name: 'XRP',
      symbol: 'XRP',
      price: 2.22,
      change1h: 0.46,
      change24h: 0.54,
      change7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      circulatingSupply: '58.39B XRP',
      logo: "/images/xrp-logo.png",
    },
    {
      id: 6,
      name: 'Solana',
      symbol: 'SOL',
      price: 151.51,
      change1h: 0.53,
      change24h: 1.26,
      change7d: 14.74,
      marketCap: 78381958631,
      volume24h: 4881674486,
      circulatingSupply: '517.31M SOL',
      logo: "/images/Solana-logo.png",
    },
    {
      id: 5,
      name: 'BNB',
      symbol: 'BNB',
      price: 606.65,
      change1h: 0.09,
      change24h: 1.20,
      change7d: 3.74,
      marketCap: 85471956947,
      volume24h: 1874281784,
      circulatingSupply: '3.08M BNB',
      logo: "/images/Bnb-logo.png",
    },
  ],
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCrypto(state, action) {
      const updated = action.payload;
      state.cryptos = state.cryptos.map(crypto =>
        crypto.id === updated.id ? { ...crypto, ...updated } : crypto
      );
    },
  },
});

export const { updateCrypto } = cryptoSlice.actions;

const store = configureStore({
  reducer: {
    crypto: cryptoSlice.reducer,
  },
});

export default store;
