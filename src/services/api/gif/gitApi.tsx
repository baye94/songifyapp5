import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Définition de l'API RTK Query pour Giphy
export const giphyApi = createApi({
    reducerPath: 'giphy',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.giphy.com/v1/' }),
    endpoints: (builder) => ({
      searchGifs: builder.query({
        query: (title) => `gifs/search?q=${title}%20Cold%20Crazy&api_key=Mi0XGvnX26B7RurHWVfnjGa6iLg5eRV6&limit=50`,
        transformResponse: (response: { data: { images: any }[] }) =>
          response.data.map((gif) => gif.images),
      }),
    }),
  });
  
  export const { useSearchGifsQuery } = giphyApi;
  