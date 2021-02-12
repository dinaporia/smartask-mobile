import React from 'react';
import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import schedulePrefsReducer from './schedulePrefsSlice';
import taskPrefsReducer from './taskPrefsSlice';
import scheduleReducer from './scheduleSlice';


export default combineReducers({
    tasks: tasksReducer,
    schedulePrefs: schedulePrefsReducer,
    taskPrefs: taskPrefsReducer,
    schedule: scheduleReducer
})