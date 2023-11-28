// Find them on rapidApi ''bing news Search''.
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY;
const newsBaseURL = process.env.REACT_APP_NEWS_BASE_URL;

const cryptoNewsHeaders = {
    "x-bingapis-sdk": "true",
    "x-rapidapi-host": newsBaseURL,
    "x-rapidapi-key": rapidApiKey,
};

const baseUrl = `https://${newsBaseURL}`;

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) =>
                createRequest(
                    `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
                ),
        }),
    }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
