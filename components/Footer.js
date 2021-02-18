import React from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { removeTask } from '../redux/tasksSlice';

const mapDispatch = { 
    removeTask: (id) => (removeTask(id))
 }; 
 
// counter returns amount of total, completed, and uncompleted task
const TaskCounter = ({totalTasks, completedTasks, remainingTasks}) => {
    return (
        <View  style={styles.container}>
            <View style={{flex: 2}}>
                <Text style={styles.count}>{totalTasks}</Text>
                <Text style={styles.text}>total</Text>
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.count}>{completedTasks}</Text>
                <Text style={styles.text}>completed</Text>
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.count}>{remainingTasks}</Text>
                <Text style={styles.text}>to do</Text>
            </View>
        </View>
    );
}

const Footer = ({tasks, removeTask}) => {
    const completedTasks = tasks.filter(task => task.completed);

    const removeCompleted = () => completedTasks.forEach(task => removeTask(task.id));

    return (
        <View style={{ alignSelf: 'stretch' }}>
            <View>
                {/* button to remove filtered tasks that are completed */}
                <Button 
                    buttonStyle={{backgroundColor: 'red'}}
                    raised
                    title='CLEAR COMPLETED'
                    onPress={() => Alert.alert(
                            'Remove Completed Tasks?',
                            'This will permanently remove all currently visible completed tasks.',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => removeCompleted()
                                }
                            ],
                            { cancelable: false }
                        )}
                    accessibilityLabel='Tap to remove completed tasks'
                />
            </View>       
            <TaskCounter completedTasks={completedTasks.length} remainingTasks={tasks.filter(task => !task.completed).length} totalTasks={tasks.length} /> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        flex: 1, 
        justifyContent: 'space-between', 
        marginTop: 10
    },
    text: {
        textAlign: 'center',
        fontSize: 10
    },
    count: {
        textAlign: 'center',
        fontSize: 14
    },
   
  });
  
export default connect(null, mapDispatch)(Footer);