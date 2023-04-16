import { configureStore } from "@reduxjs/toolkit";
import { musicApi } from "../services/api/music/musicApi";
import { giphyApi } from "../services/api/gif/gitApi";

const store = configureStore({
  reducer: {
    [giphyApi.reducerPath]: giphyApi.reducer,
    [musicApi.reducerPath]: musicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(musicApi.middleware, giphyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
