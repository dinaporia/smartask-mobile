
import React from 'react';
import RenderTaskList from './RenderTaskList';

const SortTaskList = (props) => {
    let sortedTasks = props.tasks.slice();
    
    switch (props.sortBy) {
        case "alphabet":
            // sort tasks alphabetically by name
           sortedTasks.sort((a, b) => a.task.localeCompare(b.task));
            break;
        case "due":
            // sort tasks by earliest due date
            console.log("due sort");
           sortedTasks.sort((a, b) => {
                let aDate = new Date(a.due);
                let bDate = new Date(b.due);
                return bDate - aDate;   
            });
            break;
        case "priority":
            // sort tasks by highest priority
            sortedTasks.sort((a, b) => b.priority - a.priority);
            break;
        default:
            // if sortBy isn't set, pass filtered tasks on to RenderTaskList
            sortedTasks = props.tasks.slice();
    }
    
    // pass sorted tasklist and reducers to RenderTaskList
    return (
        <RenderTaskList tasks={sortedTasks} forPage="list" selectTask={props.selectTask}/>
    );

}

 export default SortTaskList;