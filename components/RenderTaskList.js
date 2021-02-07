import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { toggleCompleted, removeTask } from '../redux/tasksSlice';

const mapDispatch = { 
    toggleCompleted: (id) => (toggleCompleted(id)),
    removeTask: (id) => (removeTask(id))
 }; 

const RenderTaskList = (props) => {
    const {tasks, toggleCompleted, removeTask, selectTask, sortBy, forPage } = props;
    if (!tasks || tasks.length === 0) return <View />;

    const rescheduleTask = () => {
        console.log("reschedule task");
    }

    // sort tasks before passing to ListItems
    let sortedTasks = tasks.slice();
    // sortBy is set by SortMenu and passed as props
    switch (sortBy) {
        case "alphabet":
            sortedTasks.sort((a,b) => a.task.localeCompare(b.task));
            break;
        case "due":
            sortedTasks.sort((a, b) => a.due.localeCompare(b.due));
            break;
        case "priority":
            sortedTasks.sort((a, b) => b.priority - a.priority);
            break;
        default:
            // no argument passed resets task order
            sortedTasks = props.tasks.slice();
    }

    return (
        <View>   
            {sortedTasks.map(task => { 
        return (
            <ListItem key={task.id}>
                <ListItem.Content style={{flex: 1}}>
                    <ListItem.CheckBox
                        title={task.task}
                        checked={task.completed}
                        checkedIcon="check-square-o"
                        uncheckedIcon="square-o"
                        containerStyle={styles.container}
                        titleProps={{style:
                            [styles.titleText,
                            (task.completed) ? styles.completed 
                            : (task.priority === 1) ? styles.want
                            : (task.priority === 3 ) ? styles.must
                            : styles.should]
                            }}
                        onPress={() => toggleCompleted(task.id)}
                        style={{flex: 2}}
                    />
                   
                </ListItem.Content>
                <ListItem.Chevron 
                    type='font-awesome'
                    name="pencil"
                    style={{flex: 1}}
                    onPress={() => selectTask(task.id)}
                    />
                {(forPage === "list") &&
                <ListItem.Chevron 
                    type='font-awesome'
                    name="times"
                    style={{flex: 1}}
                    onPress={() => removeTask(task.id)}
                    />
                        
                }
                {(forPage === "schedule") &&
                <ListItem.Chevron 
                    type='font-awesome'
                    name="calendar-times-o"
                    style={{flex: 1}}
                    onPress={rescheduleTask}
                    />
                }
            </ListItem>     
        );
    })}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderWidth: 0,
    },
    titleText: {
        marginLeft: 5,  
    },
    completed: {
        textDecorationLine: 'line-through',
        color: 'gray'  
    },
    // conditional formating for task items
    want: {
        textDecorationLine: 'none',
        color: 'green'
    },
    should: {
        textDecorationLine: 'none',
        color: 'teal'
    },
    must: {
        textDecorationLine: 'none',
        color: 'red'
    }
    
  });

export default connect(null, mapDispatch)(RenderTaskList);