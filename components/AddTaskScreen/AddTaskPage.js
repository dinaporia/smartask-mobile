import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, useSelector } from 'react-redux';

import { TaskCategoryInput, TaskNameInput, TaskDateInput } from '../shared';
import AddDetails from './AddDetails';
import { addTask } from '../../redux/tasksSlice';


const mapDispatch = { addTask };

const AddTaskPage = (props) => {
   // retrieve default task settings from store
   const defaultTask = useSelector(state => state.taskPrefs);
   // hooks for new task object
   const [taskText, setTaskText] = useState('');
   const [taskDate, setTaskDate] = useState('');
   const [taskCategory, setTaskCategory] = useState(defaultTask.category);
   // hook for modal
   const [showModal, setShowModal] = useState(false);
   // store basic task object to pass either to store or details page
   const newTask = {task: taskText, due: taskDate, category: taskCategory};

   // reset local state
   const resetBasics = () => {
      setTaskText('');
      setTaskDate('');
      setTaskCategory('');
      setShowModal(false);
   };
   
   const nameReqAlert = () => {
      Alert.alert(
         'Task name required',
         'Please name your task, so you\'ll know what it is!',
         [
            {
               text: 'OK',
               style: 'cancel',
            }
         ],
         { cancelable: false }
      );
   };

   const dateReqAlert = () => {
      Alert.alert(
         'Due date required',
         'Please enter a due date to ensure smooth scheduling functionality!',
         [
            {
               text: 'OK',
               style: 'cancel'
            }
         ],
         { cancelable: false }
      );
   }

   // add complete task object to store, navigate to list page
   const createTask = (task) => {
      if (!taskText) {
         nameReqAlert();
         if (showModal) setShowModal(false);
         return;
      }
      if (!taskDate) {
         dateReqAlert();
         if (showModal) setShowModal(false);
         return;
      }
      // merge defaults with new input
      const newTask = {...defaultTask, ...task};
      props.addTask(newTask);
      props.navigation.navigate('List');
      resetBasics();
   };

   return (
      <SafeAreaView style={{flex: 1}}>
         <View style={{flex: 1}}>
            <View style={styles.inputs}>
               <TaskNameInput onTextChange={setTaskText} task={taskText} />
               <TaskDateInput onDateChange={setTaskDate} date={taskDate} />
               <TaskCategoryInput onSelect={setTaskCategory} category={taskCategory} showLabel />
            </View>
            
            
            <View style={styles.container}>
            {/* add basic task to store, leaving default details */}
               <Button
               containerStyle={{flex: 1, marginHorizontal: 5}}
               title='QUICK ADD'
               onPress={() => createTask(newTask)}
               accessibilityLabel='Tap to quickly add task basics'
               />
            {/* open modal for details without adding task to store */}
               <Button
               containerStyle={{flex: 1, marginHorizontal: 5}}
               title='ADD DETAILS'
               onPress={() => {
                  (!taskText) ? nameReqAlert() :
                     (!taskDate) ? dateReqAlert() :
                        setShowModal(true)}
                  }
               accessibilityLabel='Tap to add more details to task'
               />
            </View>
         </View>

         {/* modal displays details input */}
         <Modal 
            animationType={'slide'}
            transparent={false}
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
            >
            {/* receives new task object, passes details input back to createTask */}
            <AddDetails taskBasics={newTask} createTask={createTask} defaultTask={defaultTask}/>
         </Modal>
   
      </SafeAreaView>
   ); 
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     flexDirection: 'row',
     marginHorizontal: 20
   },
   inputs: {
      flex: 2, 
      margin: 20,
      padding: 10, 
      justifyContent: 'flex-start', 
      borderColor: 'pink', 
      borderWidth: 1
   }
});


export default connect(null, mapDispatch)(AddTaskPage);