// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducer';

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';
import createTransform from 'redux-persist/es/createTransform';
import rootReducer from './reducer';

// Define persist configuration
const persistConfig = {
  key: 'root',
  storage: storage('panipatDB'),
  transforms: [
    createTransform(
      (inboundState, key) => inboundState,
      (outboundState, key) => outboundState,
      { whitelist: ['product', 'menu', 'session', 'quotation'] } // Whitelist specific reducers
    ),
  ],
  blacklist: [],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Determine the environment mode from environment variables
const isDevelopment = process.env.REACT_APP_DEV_MODE === 'Development';

// Configure store with different middleware settings for development and production
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in Redux Persist actions
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['_persist'],
      },
      immutableCheck: isDevelopment ? {
        warnAfter: 128, // Increase threshold for immutability checks in development
      } : false,
    });

    return middleware;
  },
});

// Persistor for persisting the store
export const persistor = persistStore(store);
export default store;
