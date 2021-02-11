import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { TaskCategoryInput, TaskNameInput, TaskDateInput } from './TaskBasics';
import AddDetails from './AddDetails';
import { connect, useSelector } from 'react-redux';
import { addTask } from '../redux/tasksSlice';

const mapDispatch = { addTask };

const AddTaskPage = (props) => {
   // retrieve default task settings from store
   const defaultTask = useSelector(state => state.defaultTask);
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
   
   // add complete task object to store, navigate to list page
   const createTask = (task) => {
      // override defaults with new input
      const newTask = {...defaultTask, ...task};
      // dispatch addTask
      props.addTask(newTask);
      props.navigation.navigate('List');
      resetBasics();
   };

   return (
      <View style={{flex: 1}}>
         <View style={{flex: 1}}>
            <View style={{flex: 2, margin: 20, padding: 10, justifyContent: 'flex-start', borderColor: 'pink', borderWidth: 1}}>
            <TaskNameInput onTextChange={setTaskText} task={taskText} />
            <TaskDateInput onDateChange={setTaskDate} date={taskDate} />
            <TaskCategoryInput onSelect={setTaskCategory} category={taskCategory} />
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
               onPress={() => setShowModal(true)}
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
   
      </View>
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
});


export default connect(null, mapDispatch)(AddTaskPage);