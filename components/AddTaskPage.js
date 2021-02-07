import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { TaskCategoryInput, TaskNameInput, TaskDateInput } from './TaskBasics';
import AddDetails from './AddDetails';
import { connect } from 'react-redux';
import { addTask } from '../redux/tasksSlice';

const mapDispatch = { addTask };

const AddTaskPage = (props) => {
   // hooks for new task object
   const [taskText, setTaskText] = useState('');
   const [taskDate, setTaskDate] = useState('');
   const [taskCategory, setTaskCategory] = useState('');
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
      // set default values
      const defaultTask = {
         duration: 30, 
         category: "Other", 
         priority: 2, 
         difficulty: 2, 
         interest: 2, 
         completed: false 
      };
      // override defaults with new input
      const newTask = {...defaultTask, ...task};
      // dispatch addTask
      props.addTask(newTask);
      props.navigation.navigate('List');
      resetBasics();
   };

   return (
      <ScrollView>
         <View >
            <TaskNameInput onTextChange={setTaskText} task={taskText} />
            <TaskDateInput onDateChange={setTaskDate} date={taskDate} />
            <TaskCategoryInput onSelect={setTaskCategory} category={taskCategory} />
            
            <View style={styles.container}>
            {/* add basic task to store, leaving default details */}
               <Button
               title='QUICK ADD'
               onPress={() => createTask(newTask)}
               accessibilityLabel='Tap to quickly add task basics'
               />
            {/* open modal for details without adding task to store */}
               <Button
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
            <AddDetails taskBasics={newTask} createTask={createTask}/>
         </Modal>
   
      </ScrollView>
   ); 
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
});


export default connect(null, mapDispatch)(AddTaskPage);