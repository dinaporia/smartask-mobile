import { createSlice } from '@reduxjs/toolkit';

const defaultPrefs = {
    hours: 240,
    maxHard: 1,
    maxTedious: 1,
    includeFun: true,
    };


const schedulePrefsSlice = createSlice({
    name: 'schedulePrefs',
    initialState: defaultPrefs,
    reducers: {
        // update prefs according to user input
        editPrefs(state, action) {
            return {...state, ...action.payload};
        },
        // resets to default prefs
        resetPrefs(state, action) {
            return defaultPrefs;
        },
    }
});

export const { editPrefs, resetPrefs } = schedulePrefsSlice.actions;
export default schedulePrefsSlice.reducer;
