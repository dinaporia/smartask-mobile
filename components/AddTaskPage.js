import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { TaskCategoryInput, TaskNameInput, TaskDateInput } from './TaskBasics';
import AddDetails from './AddDetails';
import { connect, useSelector } from 'react-redux';
import { addTask } from '../redux/tasksSlice';



const mapDispatch = { addTask };


// const  generateId = (tasks) => {
//    // store today's date as a 10 digit string
//    const today = (new Date()).toISOString().substring(0, 10);
//    // check for other tasks created today
//    const todaysTasks = tasks.map(task => task.id).filter(id => id.includes(today));
 
//    // initialize idTag for while loop
//    let idTag = 1;
//    if (todaysTasks.length > 0) {
//       for (todaysTasks.includes(today + '-' + idTag)) {
//          idTag++
//       }
//    }
 
   
 
//    if (todaysTasks.length > 0) {
//       // check that the idTag hasn't already been used
//       let existingTags = todaysTasks.filter(id => +id.substring(11) === idTag);
//       // increment idTag until it is unique
//       for (; existingTags.length > 0; idTag++) {
           
//             existingTags = todaysTasks.filter(id => +id.substring(11) === idTag);    
//       }
//    }
//    // append idTag to date to create unique id
//    return today + '-' + idTag;
// }


const AddTaskPage = (props) => {
const tasks = useSelector(state => state.tasks);

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
      setShowModal(false);
   };

   

   // add complete task object to store, navigate to list page
   const createTask = (task) => {
      // generate id, set default values
      const defaultTask = {

         duration: 30, 
         category: "Other", 
         priority: 2, 
         difficulty: 2, 
         interest: 2, 
         completed: false 
      };
      // add new input values, override defaults
      const newTask = {...defaultTask, ...task};
      console.log("create task: " + JSON.stringify(newTask));
      // dispatch addTask
      props.addTask(newTask);
      // go to list page
      props.navigation.navigate('List');
      // reset state
      resetBasics();
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
               onPress={() => createTask(newTask)}
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
            <AddDetails taskBasics={(newTask)} navigation={props.navigation} addDetailed={createTask}/>
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