
import React from 'react';
import RenderTaskList from './RenderTaskList';

const SortTaskList = (props) => {
    let sortedTasks = props.tasks;
    
    switch (props.sortBy) {
        case "alphabet":
            // sort tasks alphabetically by task property
           sortedTasks.sort((a, b) => a.task.localeCompare(b.task));
            break;
        case "due":
            // sort tasks by earliest due date
           sortedTasks.sort((a, b) => b.due - a.due);
            break;
        case "priority":
            // sort tasks by highest priority
            sortedTasks.sort((a, b) => a.priority - b.priority);
            break;
        default:
            // if sortBy isn't set, pass filtered tasks on to RenderTaskList
            sortedTasks = props.tasks.slice();
    }
    
    // pass sorted tasklist and reducers to RenderTaskList
    return (
        <RenderTaskList tasks={sortedTasks} navigation={props.navigation} forPage="list"/>
    );

}

 export default SortTaskList;