import React from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
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

    const renderTask = ({item}) => {
        return (
            <SwipeRow rightOpenValue={-100} >
                {(forPage === "list") ?
                <View style={styles.deleteView} >
                    <TouchableOpacity 
                        style={styles.deleteTouchable}
                        onPress={() => Alert.alert(
                            'Remove Task?',
                            'This will permanently remove the selected task from your list.',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => removeTask(item.id)
                                }
                            ],
                            { cancelable: false }
                        )}
                    >
                        <Text style={styles.deleteText} >Delete</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.deleteView} >
                    <TouchableOpacity 
                        style={styles.deleteTouchable}
                        onPress={() => Alert.alert(
                            'Reschedule Task?',
                            'This will remove the task from today\'s schedule, but the task will remain on your list.',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => rescheduleTask(item.id)
                                }
                            ],
                            { cancelable: false }
                        )}
                    >
                        <Text style={styles.deleteText} >Delete</Text>
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
                                onPress={() => toggleCompleted(item.id)}
                                style={{flex: 2}}
                            />
                        
                        </ListItem.Content>
                        {/* pencil icon allows editing task */}
                        <ListItem.Chevron 
                            type='font-awesome'
                            name="pencil"
                            style={{flex: 1}}
                            onPress={() => selectTask(item.id)}
                            />
                </ListItem>  
                </View>
            </SwipeRow>   
        );
    };
        
        
    return (
        <View>   
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
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
  });

export default connect(null, mapDispatch)(RenderTaskList);