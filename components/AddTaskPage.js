import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { TaskCategoryInput, TaskNameInput, TaskDateInput } from './TaskBasics';
import { connect } from 'react-redux';
import { addTask } from '../redux/tasksSlice';


const mapDispatch = { addTask };

// component holds state for new task object to pass on to store after all fields have been completed

class AddTaskPage extends Component {
   constructor(props) {
      super(props);
      
      this.state = {
         id: '',
         task: '',
         due: '',
         category: 'Work',
         recurring: false,
         completed: false,
      }
   }
   
   // methods handle input from child components
   onTextChange = (text) => this.setState({task: text});
   onDateChange = (date) => this.setState({due: date});
   setProperty = (property, value) => {
      this.setState({[property]: value});
   }

   // method generates new id before passing state to store
   generateId = () => {
      // store today's date as a 10 digit string
      const today = (new Date()).toISOString().substring(0, 10);
      // initialize idTag for while loop
      let idTag = 1;
      // if other tasks exist with this creation date
      const todaysTasks = this.props.tasks.filter(task => task.id.includes(today));
      if (todaysTasks.length > 0) {
         // check that the idTag hasn't already been used
         let existingTags = todaysTasks.filter(task => +task.id.substring(11) === idTag);
         // increment idTag until it is unique
         for (let i = 1; existingTags.length > 0; i++) {
               idTag = i;
               existingTags = todaysTasks.filter(task => +task.id.substring(11) === i);    
         }
      }
      // append idTag to date to create unique id
      return today + '-' + idTag;
      }
   
   quickAdd = () => {
      // assign new id and add to state
      const newTask = {...this.state, id: this.generateId()};
      // dispatch addTask
      this.props.addTask(newTask);
      // reset state
      this.setState({id: '', task:'', due:'', category: 'Work'});
      
      console.log("new task: " + JSON.stringify(this.state));
      // navigate to task list
      this.props.navigation.navigate('List');
      
   }
  
   passToDetails = () => {
      this.props.navigation.navigate('Details');
   }

   render() {
      return (
         <ScrollView >
            <TaskNameInput onTextChange={this.onTextChange} task={this.state.task}
            />
            <TaskDateInput onDateChange={this.onDateChange} date={this.state.due}
            />
            <TaskCategoryInput onSelect={this.setProperty} category={this.state.category}
            />
            <View style={styles.container}>
               <Button
               title='QUICK ADD'
               onPress={this.quickAdd}
               accessibilityLabel='Tap to quickly add task basics'
               />
               <Button
               title='ADD DETAILS'
               onPress={this.passToDetails}
               accessibilityLabel='Tap to add more details to task'
               />
            </View>
       </ScrollView>
      

    ) 
   }
}
const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
 });


export default connect(null, mapDispatch)(AddTaskPage);