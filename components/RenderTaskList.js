import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { toggleCompleted } from '../redux/tasksSlice';


const mapDispatch = { 
    toggleCompleted: (id) => (toggleCompleted(id))
 }; 


const RenderTaskList = (props) => {
    const {tasks, toggleCompleted, forPage, navigation } = props;
    const removeTask = () => {
        console.log("remove task");
     }
     const rescheduleTask = () => {
        console.log("reschedule task");
     }
     // passed as props to TaskList
     const editDetails = (id) => {
        props.selectTask(id);
 

     };
    
    const taskList = tasks.map(task => {
       
        return (
            <ListItem key={task.id}>
                <ListItem.Content style={{flex: 1}}>
                    <ListItem.CheckBox
                        title={task.task}
                        checked={task.completed}
                        checkedIcon="check-square-o"
                        uncheckedIcon="square-o"
                        onPress={() => toggleCompleted(task.id)}
                        style={{flex: 2}}
                    />
                   
                </ListItem.Content>
                <ListItem.Chevron 
                    type='font-awesome'
                    name="pencil"
                    style={{flex: 1}}
                    onPress={() => editDetails(task.id)}
                    />
                {(forPage === "list") &&
                <ListItem.Chevron 
                    type='font-awesome'
                    name="times"
                    style={{flex: 1}}
                    onPress={removeTask}
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
    });

    if (!tasks || tasks.length === 0) return <View />;
    return (

        <View>   
            {taskList}
        </View>
    );
}


export default connect(null, mapDispatch)(RenderTaskList);