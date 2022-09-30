import { Middleware, configureStore } from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
// import { createLogger } from 'redux-logger';
import gridReducer from '@features/gridSlice';

// const logger = createLogger({});

const ADDED_MIDDLEWARES: Middleware[] = [];

const addedMiddlewares = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware
) => {
  const middlewares = ADDED_MIDDLEWARES;

  if (middlewares.length > 0) {
    return getDefaultMiddleware().concat(...middlewares);
  }

  return getDefaultMiddleware();
};

const store = configureStore({
  reducer: {
    grid: gridReducer,
  },
  middleware: (getDefaultMiddleware) => addedMiddlewares(getDefaultMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
