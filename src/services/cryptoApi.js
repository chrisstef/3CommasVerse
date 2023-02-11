import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY;
const cryptoBaseURL = process.env.REACT_APP_CRYPTO_BASE_URL;


const cryptoApiHeaders = {
  "x-rapidapi-host": cryptoBaseURL,
  "x-rapidapi-key": rapidApiKey,
};

const baseUrl = `https://${cryptoBaseURL}`;

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history?timePeriod=${timeperiod}`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;

// make store.js
// pass that store variable to a Provider
// crete a api to fetch api data from rapidapi
// connect api to store
