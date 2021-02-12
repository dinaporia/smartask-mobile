import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './index';



const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;