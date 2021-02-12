import { createSlice } from '@reduxjs/toolkit';

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        forDate: null,
        schedule: [],
        notToday: [],
    },
    reducers: {
        // create intial schedule
        createSchedule(state, action) {
            return {
                forDate: (new Date().toISOString()),
                schedule: action.payload,
                notToday: []
            }
        },
        // update schedule
        rebuildSchedule(state, action) {
            return {
                ...state,
                schedule: action.payload
            }
        },
        removeTaskFromSchedule(state, action) {
            // add task to notToday if not already there
            if (state.notToday && (!state.notToday.includes(action.payload))) {
                state.notToday.push(action.payload);
            }
            // remove task from schedule if there
            if (state.schedule && (state.schedule.includes(action.payload))) {
                state.schedule = state.schedule.filter(task => task !== action.payload);
            }
        },
        addTaskToSchedule(state, action) {
            // add task to schedule if not already there
            if (state.schedule && !state.schedule.includes(action.payload)) {
                state.schedule.push(action.payload)
            }
            // remove task from notToday if there
            if (state.notToday && state.notToday.includes(action.payload)) {
                state.notToday = state.notToday.filter(task => task !== action.payload);
            }
        }
    }
});

export const { createSchedule, rebuildSchedule, removeTaskFromSchedule, addTaskToSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;