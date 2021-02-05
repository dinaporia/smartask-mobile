import React from 'react';
import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';




export default combineReducers({
    tasks: tasksReducer,

})