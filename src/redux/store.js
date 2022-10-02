import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { dragonsApi } from './selectionsApi';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth';
import persistStore from 'redux-persist/es/persistStore';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'isLoggedIn', 'user'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    [dragonsApi.reducerPath]: dragonsApi.reducer,
 
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(dragonsApi.middleware),
});

export const persistor = persistStore(store);
