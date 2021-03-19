import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { toggleCompleted, removeTask } from '../../redux/tasksSlice';
import { addTaskToSchedule } from '../../redux/scheduleSlice';

const RenderTaskList = (props) => {
    const dispatch = useDispatch();
    const {tasks, selectTask, sortBy, canDelete = false, canEdit = false } = props;
    if (!tasks || tasks.length === 0) return <View />;

    // sort tasks before passing to ListItems
    let sortedTasks = tasks.slice();
    // sortBy is set by SortMenu and passed as props
    switch (sortBy) {
        case "alphabet":
            sortedTasks.sort((a,b) => a.task.toLowerCase().localeCompare(b.task.toLowerCase()));
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

    const renderTask = ({item}) => {
        return (
            <SwipeRow rightOpenValue={(canDelete)? -116 : -58}>
                {canDelete ?
                <View style={styles.deleteView}>
                    <TouchableOpacity 
                        style={styles.addToScheduleTouchable}
                        onPress={() => Alert.alert(
                            'Add to Schedule?',
                            'This task will be added to today\'s schedule.',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK',
                                    onPress: () => dispatch(addTaskToSchedule(item.id))
                                }
                            ],
                            { cancelable: false }
                        )}
                    >
                        <Icon
                            reverse
                            name='calendar-check-o'
                            type='font-awesome'
                            color='green'
                            size={20}

                            />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.deleteTouchable}
                        onPress={() => Alert.alert(
                            'Remove Task?',
                            'This will permanently remove the selected task.',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK',
                                    onPress: () => dispatch(removeTask(item.id))
                                }
                            ],
                            { cancelable: false }
                        )}
                    >
                        <Icon
                            reverse
                            name='trash-o'
                            type='font-awesome'
                            color='red'
                            size={20}
                            />
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.deleteView} >
                    <TouchableOpacity 
                        style={styles.deleteTouchable}
                        onPress={() => Alert.alert(
                            'Reschedule Task?',
                            'This will remove the task from today\'s schedule, but the task will remain on your task list.',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => selectTask(item.id)
                                }
                            ],
                            { cancelable: false }
                        )}
                    >
                        <Icon
                            reverse
                            name='calendar-times-o'
                            type='font-awesome'
                            color='red'
                            size={20}

                            />
                    </TouchableOpacity>
                </View>
                }
                <View>
                    <ListItem >
                        <ListItem.Content style={{flex: 1}}>
                            <ListItem.CheckBox
                                title={item.task}
                                checked={item.completed}
                                checkedIcon="check-square-o"
                                uncheckedIcon="square-o"
                                containerStyle={styles.container}
                                // task name is styled according to completion status and priority
                                titleProps={{style:
                                    [styles.titleText,
                                    (item.completed) ? styles.completed 
                                    : (item.priority === 1) ? styles.want
                                    : (item.priority === 3 ) ? styles.must
                                    : styles.should]
                                    }}
                                onPress={() => dispatch(toggleCompleted(item.id))}
                                style={{flex: 2}}
                            />
                        </ListItem.Content>
                        {canEdit &&
                        <ListItem.Chevron 
                            type='font-awesome'
                            name="pencil"
                            style={{flex: 1}}
                            onPress={() => selectTask(item.id)}
                        />}
                    </ListItem>  
                </View>
            </SwipeRow>   
        );
    };
            
    return (
        <View style={{marginBottom: 200}}>
        <FlatList 
            data={sortedTasks}
            renderItem={renderTask}
            keyExtractor={item => item.id}
        />   
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
       
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
    },
    // formatting for swiperow and delete options
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center',
    },
    addToScheduleTouchable: {
        backgroundColor: 'green',
        height: '100%',
        justifyContent: 'center',
    },
    deleteText: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 16,
        width: 75
    },
  });

export default RenderTaskList;