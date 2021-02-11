import { createSlice } from '@reduxjs/toolkit';

const defaultTask = {
    category: 'Other',
    priority: 2,
    difficulty: 2,
    interest: 2,
    duration: 90,
    completed: false
};

const taskPrefsSlice = createSlice({
    name: 'taskPrefs',
    initialState: defaultTask,
    reducers: {
        // update default task according to user input
        editDefaultTask(state, action) {
            return {...state, ...action.payload};
        },
        // reset default task
        resetDefaultTask(state, action) {
            return defaultTask;
        }
    }
});

export const { editDefaultTask, resetDefaultTask } = taskPrefsSlice.actions;
export default taskPrefsSlice.reducer;
