/* store/slices/newsSlice.ts */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNews } from '../../api/news' 
import { NewsArticle } from "../types/newsTypes";

interface NewsState {
  data: NewsArticle[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: NewsState = {
  data: null,
  status: 'idle',
};

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await getNews()
  return response;
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.results;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default newsSlice.reducer;
