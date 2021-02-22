import React, { useState } from 'react';
import { Text, View, Alert, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import { DurationInput, DifficultyInput, InterestInput, PriorityInput, TaskCategoryInput } from '../shared';
import { editDefaultTask, resetDefaultTask, defaultTask } from '../../redux/taskPrefsSlice';


// determines default settings for quick-added tasks
const TaskPrefs = () => {
    const dispatch = useDispatch();
    const task = useSelector(state => state.taskPrefs);
 
    const [category, setCategory] = useState(task.category);
    const [priority, setPriority] = useState(task.priority);
    const [difficulty, setDifficulty] = useState(task.difficulty);
    const [interest, setInterest] = useState(task.interest);
    const [duration, setDuration] = useState(task.duration);
 
    // send new task object to store
    const saveDefaultTask = () => {
       const newTask = {
          category: category,
          priority: priority,
          difficulty: difficulty,
          interest: interest,
          duration: duration
       }
       dispatch(editDefaultTask(newTask));
       return Alert.alert('Your task defaults have been updated.');
    };
   
    // reset task defaults in store and local state
    const onTaskReset = () => {
       dispatch(resetDefaultTask());
       setCategory(defaultTask.category);
       setInterest(defaultTask.interest);
       setPriority(defaultTask.priority);
       setDifficulty(defaultTask.difficulty);
       setDuration(defaultTask.duration);
    };
 
    return (
       <ScrollView>
          <View style={{flex: 1, margin: 10, padding: 10, backgroundColor: 'pink'}}>
             <Text style={styles.subTitle}>Default Task Settings</Text>
             <Text style={{paddingHorizontal: 3, textAlign: 'center'}}>Specify the default settings for quick-added tasks.</Text>
             <Card>
                <Card.Title>
                   Category
                </Card.Title>
                <Card.Divider />
                <TaskCategoryInput onSelect={setCategory} category={category} />
             </Card>
             <PriorityInput priority={priority} setPriority={setPriority}/>
             <InterestInput interest={interest} setInterest={setInterest}/>
             <DifficultyInput difficulty={difficulty} setDifficulty={setDifficulty}/>
             <DurationInput duration={duration} setDuration={setDuration} />
             <View style={{margin: 5, padding: 10}}>
                <Button 
                title="SAVE TASK DEFAULTS"
                buttonStyle={{backgroundColor: 'indigo'}}
                onPress={saveDefaultTask}
                accessibilityLabel='Tap to save task settings'
                />
                <Button 
                containerStyle={{marginTop: 10}}
                title="RESET TASK DEFAULTS"
                onPress={onTaskReset}
                accessibilityLabel='Tap to reset task defaults'
                />
             </View>
          </View>
       </ScrollView> 
    );
 };

 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginHorizontal: 20
    },
    subTitle: {
       fontSize: 16,
       fontWeight: 'bold',
       textAlign: 'center',
       marginBottom: 5,
       color: 'indigo'
    },
 
 });
 
 
 export default TaskPrefs;