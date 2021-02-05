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

   const resetBasics = () => {
      setTaskText('');
      setTaskDate('');
      setTaskCategory('');
   };
   // adds complete task object to store, navigates to list page
   const addDetailed = (task) => {
      props.addTask(task);
      props.navigation.navigate('List');
      resetBasics();
      setShowModal(false);
   };

   // stores basic task object to pass either to store or details page
   const newTask = {task: taskText, due: taskDate, category: taskCategory};

   return (
      <ScrollView>
         <View >
            <TaskNameInput onTextChange={setTaskText} task={taskText}
            />
            <TaskDateInput onDateChange={setTaskDate} date={taskDate}
            />
            <TaskCategoryInput onSelect={setTaskCategory} category={taskCategory}
            />
            <View style={styles.container}>
               <Button
               title='QUICK ADD'
               onPress={() => addDetailed(newTask)}
               accessibilityLabel='Tap to quickly add task basics'
               />
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
            <AddDetails taskBasics={(newTask)} navigation={props.navigation} addDetailed={addDetailed}/>
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