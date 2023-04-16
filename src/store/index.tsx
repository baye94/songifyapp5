import { configureStore } from "@reduxjs/toolkit";
import { musicApi } from "../services/api/music/musicApi";

const store = configureStore({
  reducer: {
    [musicApi.reducerPath]: musicApi.reducer,// Utiliser musicReducer au lieu de TaskApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(musicApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

export type AppDispatch = typeof store.dispatch;
