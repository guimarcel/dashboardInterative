import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCrypto, getCoins, getCoin, getCoinHistory } from '../../api/crypto' 
import { Coins, Coin, CoinHistory } from "../types/cryptoTypes";


interface CryptoState {
  data: {
    [key: string]: {
      brl: number;
    };
  } | null;
  coinList: Coins[] | null;
  coin: Coin | undefined;
  coinHistory: CoinHistory[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  coinListStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  coinHistoryStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  coinStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  coinListError: string | null;
  coinHistoryError: string | null;
  coinError: string | null;
}

const initialState: CryptoState = {
  data: null,
  coinList: null,
  coin: undefined,
  coinHistory: null,
  status: 'idle',
  coinListStatus: 'idle',
  coinHistoryStatus: 'idle',
  coinStatus: 'idle',
  error: null,
  coinListError: null,
  coinHistoryError: null,
  coinError: null,
};


export const fetchCrypto = createAsyncThunk(
  'crypto/fetchCrypto',
  async (coin: string) => {
    const response = await getCrypto(coin)
    return response;
  }
);

export const fetchCoinList = createAsyncThunk(
  'crypto/fetchCoinList',
  async () => {
    const response = await getCoins();
    return response;
  }
);

export const fetchCoin = createAsyncThunk(
  'crypto/fetchCoin',
  async (coin: string) => {
    const response = await getCoin(coin);
    return response;
  }
);

export const fetchCoinHistory = createAsyncThunk(
  'crypto/fetchCoinHistory',
  async (filter: [string, number]) => {
    const response = await getCoinHistory(filter);
    return response;
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCrypto.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchCoin.pending, (state) => {
        state.coinStatus = 'loading';
      })
      .addCase(fetchCoin.fulfilled, (state, action) => {
        state.coinStatus = 'succeeded';
        state.coin = action.payload;
      })
      .addCase(fetchCoin.rejected, (state, action) => {
        state.coinStatus = 'failed';
        state.coinError = action.error.message || 'Erro ao buscar moeda';
      })
      .addCase(fetchCoinList.pending, (state) => {
        state.coinListStatus = 'loading';
      })
      .addCase(fetchCoinList.fulfilled, (state, action) => {
        state.coinListStatus = 'succeeded';
        state.coinList = action.payload;
      })
      .addCase(fetchCoinList.rejected, (state, action) => {
        state.coinListStatus = 'failed';
        state.coinListError = action.error.message || 'Erro ao buscar lista de moedas';
      })
      .addCase(fetchCoinHistory.pending, (state) => {
        state.coinHistoryStatus = 'loading';
      })
      .addCase(fetchCoinHistory.fulfilled, (state, action) => {
        state.coinHistoryStatus = 'succeeded';
        state.coinHistory = action.payload;
      })
      .addCase(fetchCoinHistory.rejected, (state, action) => {
        state.coinHistoryStatus = 'failed';
        state.coinHistoryError = action.error.message || 'Erro ao buscar histórico de moedas';
      });
  },
});

export default cryptoSlice.reducer;
