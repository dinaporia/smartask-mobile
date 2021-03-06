import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Card } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { DurationInput, DifficultyInput, InterestInput, PriorityInput, TaskCategoryInput, TaskNameInput, TaskDateInput } from '../shared';
import { editTask } from '../../redux/tasksSlice';

const EditDetails = ({ taskId, setShowModal }) => {
   const dispatch = useDispatch();
   const tasks = useSelector(state => state.tasks);
   // retrieve task from store by id
   const {task, due, category, priority, duration, difficulty, interest } = tasks.filter(task => task.id === taskId)[0];
   
   // hooks for task object
   const [taskText, setTaskText] = useState(task);
   const [taskDate, setTaskDate] = useState(due);
   const [taskCategory, setTaskCategory] = useState(category);
   const [taskPriority, setPriority] = useState(priority);
   const [taskDifficulty, setDifficulty] = useState(difficulty);
   const [taskInterest, setInterest] = useState(interest);
   const [taskDuration, setDuration] = useState(duration);

   // resets task on Cancel
   const resetTask = () => {
   setTaskText(task);
   setTaskDate(due);
   setTaskCategory(category);
   setPriority(priority);
   setDifficulty(difficulty);
   setInterest(interest);
   setDuration(duration);
   setShowModal(false);
   };

   // dispatch updated task to store
   const updateTask = () => {

      const updatedTask = {
         task: taskText, 
         due: taskDate, 
         category: taskCategory, 
         priority: taskPriority, 
         duration: taskDuration, 
         difficulty: taskDifficulty, 
         interest: taskInterest 
      };
      dispatch(editTask({taskId: taskId, updatedTask: updatedTask}));
      setShowModal(false);
   }
   
    return (
      <SafeAreaView style={{padding: 10}}>
         <ScrollView >
            <Card>
            <View style={{margin: 5, marginBottom: 15}}>
               <TaskNameInput task={taskText} onTextChange={setTaskText} />
               </View>
               <View style={{margin: 5, marginBottom: 15}}>
               <TaskDateInput onDateChange={setTaskDate} date={taskDate} />
               </View>
               <View style={{margin: 5}}>
               <TaskCategoryInput onSelect={setTaskCategory} category={taskCategory} />
               </View>
            </Card>
            
            <PriorityInput priority={taskPriority} setPriority={setPriority} />
            <InterestInput interest={taskInterest} setInterest={setInterest} />
            <DifficultyInput difficulty={taskDifficulty} setDifficulty={setDifficulty} />
            <DurationInput duration={taskDuration} setDuration={setDuration} />

            <View style={styles.container}>
               <Button 
               title="SAVE CHANGES"
               onPress={updateTask}
               accessibilityLabel='Tap to save updated task'
               containerStyle={styles.button}
               />
               <Button 
               title="CANCEL"
               onPress={resetTask}
               accessibilityLabel='Tap to cancel'
               containerStyle={styles.button}
               />
            </View>
         </ScrollView>
      </SafeAreaView>
    );
   }

   const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 20
      },
      button: {
         flex: 1, 
         marginHorizontal: 5, 
      }
   });

export default EditDetails;