import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './index'



export default store = configureStore({
    reducer: rootReducer,
});

