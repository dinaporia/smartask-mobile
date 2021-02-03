import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';


const RenderTaskList = (props) => {
    const taskList = props.tasks.map(task => {

        return (
            <ListItem key={task.id}>
                <ListItem.Content style={{flex: 1}}>
                    <ListItem.CheckBox
                        title={task.task}
                        checked={task.completed}
                        checkedIcon="check-square-o"
                        uncheckedIcon="square-o"
                        onLongPress={props.editDetails}
                        onPress={props.toggleCompleted}
                        style={{flex: 2}}
                    />
                   
                </ListItem.Content>
                <ListItem.Chevron 
                        type='font-awesome'
                        name="times"
                        style={{flex: 1}}
                        onPress={props.removeTask}
                        />
            </ListItem>     
        );
    });
    if (!props.tasks || props.tasks.length === 0) return <View />;
    return (

        <View>   
            {taskList}
        </View>
    );
}


export default RenderTaskList;