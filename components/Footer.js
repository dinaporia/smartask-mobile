import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

// counter returns total, completed, and uncompleted tasks from filtered
const TaskCounter = (props) => {
    const totalTasks = props.tasks.length;
    const completedTasks = props.tasks.filter(task => task.completed).length;
    const remainingTasks = props.tasks.filter(task => !task.completed).length;
    return (
        <View  style={styles.container}>
            <Text style={{flex: 1, marginRight: 20}}>
                TASKS
            </Text>
            <View style={{flex: 2}}>
                <Text style={{textAlign: 'center'}}>{totalTasks}</Text>
                <Text style={{textAlign: 'center'}}>total</Text>
            </View>
            <View style={{flex: 2}}>
                <Text style={{textAlign: 'center'}}>{completedTasks}</Text>
                <Text>completed</Text>
            </View>
            <View style={{flex: 2}}>
                <Text style={{textAlign: 'center'}}>{remainingTasks}</Text>
                <Text style={{textAlign: 'center'}}>to do</Text>
            </View>
        </View>
    );
}

const Footer = (props) => {
    return (
        <ScrollView>
           {/* button to remove filtered tasks that are completed */}
            <Button 
                containerStyle={styles.button}
                title='CLEAR COMPLETED'
                onPress={() => props.removeCompleted(props.tasks)}
                accessibilityLabel='Tap to remove completed tasks'
            />
            <TaskCounter tasks={props.tasks}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {

        margin: 20
    }

  });
  
export default Footer;