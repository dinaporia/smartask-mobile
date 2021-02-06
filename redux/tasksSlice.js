import { createSlice } from '@reduxjs/toolkit';

   // helper function generates new id before passing state to store
 const  generateId = (tasks) => {
    // store today's date as a 10 digit string
    const today = (new Date()).toISOString().substring(0, 10);
    // initialize idTag for while loop
    let idTag = 1;
    // if other tasks exist with this creation date
    const todaysTasks = tasks.filter(task => task.id.includes(today));
    if (todaysTasks.length > 0) {
       // check that the idTag hasn't already been used
       let existingTags = todaysTasks.filter(task => +task.id.substring(11) === idTag);
       // increment idTag until it is unique
       for (let i = 1; existingTags.length > 0; i++) {
             idTag = i;
             existingTags = todaysTasks.filter(task => +task.id.substring(11) === i);    
       }
    }
    // append idTag to date to create unique id
    return today + '-' + idTag;
 }

const myTasks = [
    {
        id: '2021-01-12-1',
        task: "Create a to-do list",
        due: "2021-07-25",
        duration: 30,
        category: "Home",
        priority: 1,
        difficulty: 1,
        interest: 1,
        recurring: false,
        completed: true
    },
    {
            id: '2021-01-14-2',
            task: "Test my to-do list",
            due: "2021-06-26",
            duration: 30,
            category: "Work",
            priority: 1,
            difficulty: 1,
            interest: 2,
            recurring: false,
            completed: false
    },
    {
            id: '2021-01-14-3',
            task: "Implement error checking",
            due: "2022-10-25",
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
            task: "Fetch tasks from server",
            due: "2021-03-25",
            duration: 120,
            category: "Work",
            priority: 2,
            difficulty: 1,
            interest: 3,
            recurring: false,
            completed: false
    },
    {
            id: '2021-01-14-5',
            task: "Scheduling algorithm",
            due: "2021-06-25",
            duration: 180,
            category: "Work",
            priority: 3,
            difficulty: 3,
            interest: 3,
            recurring: false,
            completed: false
    },
    {
            id: '2021-01-14-6',
            task: "Preferences input page",
            due: "2021-09-05",
            duration: 30,
            category: "Work",
            priority: 3,
            difficulty: 2,
            interest: 1,
            recurring: false,
            completed: false
    },
    {
            id: '2021-01-14-7',
            task: "Split tasks into subtasks",
            due: "2021-07-05",
            duration: 60,
            category: "Work",
            priority: 2,
            difficulty: 4,
            interest: 1,
            recurring: false,
            completed: false
    },
];

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: myTasks,
    reducers: {
       
        // gets task properties from input through local state
        // adds task to state, overriding default values if given
        addTask(state, action) {
            const defaultTask = {
                id: generateId(state),
                duration: 30, 
                category: "Work", 
                priority: 2, 
                difficulty: 2, 
                interest: 2, 
                completed: false 
            };
            const task = action.payload;
            state.push({...defaultTask, ...task});
        },

        // gets task id and new details, updates task in store
        editTask(state, action) {
            const {taskId, updatedTask} = action.payload
            const task = state.find(task => task.id === taskId);
            const taskIndex = state.findIndex(task => task.id === taskId);
            state[taskIndex] = {...task, ...updatedTask};
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

export const { addTask, toggleCompleted, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;
