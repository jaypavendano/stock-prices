import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export type SearchResponse = {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
};

export const search = async (query: string): Promise<SearchResponse[]> => {
  return await api
    .get(
      `/search-ticker?query=${query}&limit=10&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    )
    .then((res) => res.data);
};

export type HistoricalPrice = {
  date: string;
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
};

export const getHistoricalPrice = async (
  symbol: string,
  from: string,
  to: string
): Promise<HistoricalPrice[]> => {
  return await api
    .get(
      `/historical-chart/4hour/${symbol}?from=${from}&to=${to}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    )
    .then((res) => res.data);
};
