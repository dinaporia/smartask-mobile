import { createSlice } from '@reduxjs/toolkit';

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        forDate: null,
        schedule: [],
        notToday: [],
        queued: []
    },
    reducers: {
        // create initial schedule
        createSchedule(state, action) {
            const { schedule, forDate } = action.payload;
            // if date hasn't changed, retain notToday array
            if (forDate === state.forDate) {
                return {
                    ...state,
                    schedule: schedule,
                    queued: []
                };
            };
            // if new date, reset notToday, update date
            return {
                forDate: forDate,
                schedule: schedule,
                notToday: [],
                queued: []
            };
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
            const date = new Date();
            const today = date.toISOString().substring(0, 10);
            const taskId = action.payload;
            // check if schedule already exists

            if (state.forDate === today) {
                // if task was already on schedule, do nothing
                if (state.schedule.includes(taskId)) {
                    return state;
                }
                // remove task from notToday
                if (state.notToday.includes(taskId)) {
                    state.notToday = state.notToday.filter(task => task !== taskId);
                }
                // add task to schedule
                state.schedule.push(taskId);
            } else {
                // if today's schedule hasn't been built yet, 
                // clear potential leftovers and queue tasks
                state.forDate = today;
                state.schedule = [];
                state.notToday = [];
                state.queued.push(taskId)
            }  
        }
    }
});

export const { createSchedule, removeTaskFromSchedule, addTaskToSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;