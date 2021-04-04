import { createSlice, nanoid } from '@reduxjs/toolkit';

const myTasks = [
    {
        id: '2021-01-12-1',
        task: "Plumber union reschedule",
        due: "2021-02-19",
        duration: 30,
        category: "Home",
        priority: 1,
        difficulty: 1,
        interest: 1,
        recurring: false,
        completed: false
    },
    {
            id: '2021-01-14-2',
            task: "Call temp agency",
            due: "2021-05-17",
            duration: 15,
            category: "Work",
            priority: 1,
            difficulty: 1,
            interest: 2,
            recurring: false,
            completed: false
    },
    {
            id: '2021-01-14-3',
            task: "Become invincible",
            due: "2021-03-17",
            duration: 120,
            category: "Other",
            priority: 2,
            difficulty: 2,
            interest: 1,
            recurring: false,
            completed: false
    },
    {
            id: '2021-01-14-4',
            task: "Meeting with PTA",
            due: "2021-02-25",
            duration: 60,
            category: "Work",
            priority: 2,
            difficulty: 1,
            interest: 3,
            recurring: false,
            completed: false
    },
    {
            id: '2021-01-14-5',
            task: "Haircut",
            due: "2021-06-25",
            duration: 60,
            category: "Work",
            priority: 3,
            difficulty: 3,
            interest: 3,
            recurring: false,
            completed: false
    },
];

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: myTasks,
    reducers: {
        // gets task properties from input through local state
        // generates id and adds task to state
        addTask: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(task) {
                return {
                    payload: { ...task, id: nanoid() }
                }
            }
        },
        // gets task id and new details, updates task in store
        editTask(state, action) {
            const {taskId, updatedTask} = action.payload
            const task = state.find(task => task.id === taskId);
            if (task) {
                const taskIndex = state.findIndex(task => task.id === taskId);
                state[taskIndex] = {...task, ...updatedTask};
            }
        },

        removeTask(state, action) {
            return  state.filter(task => task.id !== action.payload);
        },

        // gets task id, toggles completed
        toggleCompleted(state, action) {
            const task = state.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        }
        
    }
});

export const { addTask, removeTask, editTask, toggleCompleted } = tasksSlice.actions;
export default tasksSlice.reducer;
