import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { minecraftApi } from '../slice';

export const store = configureStore({
  reducer: {
    [minecraftApi.reducerPath]: minecraftApi.reducer,
  },
  middleware: (getDefautlMiddleware) =>
    getDefautlMiddleware().concat(minecraftApi.middleware),
});

setupListeners(store.dispatch);
