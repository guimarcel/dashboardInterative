import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getWeather, getForecast } from '../../api/weather/route' 
import { WeatherResponse, ForecastResponse } from "../types/weatherTypes";

interface WeatherState {
  weather: WeatherResponse | null;
  forecast: ForecastResponse | null;
  statusWeather: 'idle' | 'loading' | 'succeeded' | 'failed';
  statusForecast: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: WeatherState = {
  weather: null,
  forecast: null,
  statusWeather: 'idle',
  statusForecast: 'idle',
};


export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string) => {
    const response = await getWeather(city)
    return response;
  }
);

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (city: string) => {
    const response = await getForecast(city)
    console.log("response", response)
    return response;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.statusWeather = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.statusWeather = 'succeeded';
        if(action.payload['cod'] != 404) state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.statusWeather = 'failed';
      })
      .addCase(fetchForecast.pending, (state) => {
        state.statusForecast = 'loading';
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.statusForecast = 'succeeded';
        console.log("payload", action.payload['cod'] != 404)
        if(action.payload['cod'] != 404) state.forecast = action.payload;
      })
      .addCase(fetchForecast.rejected, (state) => {
        state.statusForecast = 'failed';
      });
  },
});

export default weatherSlice.reducer;
