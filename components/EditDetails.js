import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import {DurationInput, DifficultyInput, InterestInput, PriorityInput} from './TaskDetails';
import { TaskCategoryInput, TaskNameInput, TaskDateInput } from './TaskBasics';
import { connect } from 'react-redux';
import { editTask } from '../redux/tasksSlice';


const mapState = state => {
   return {
      tasks: state.tasks
   }
};

const mapDispatch = { editTask };

const EditDetails = ({taskId, setShowModal, tasks, editTask}) => {
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
   // customized tesk for duration slider
   const durationText = (taskDuration/60).toFixed(1) + " hours";

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
      editTask({taskId: taskId, updatedTask: updatedTask});
      setShowModal(false);
   }
   
    return (
      <ScrollView>
         <TaskNameInput task={taskText} onTextChange={setTaskText} />
         <TaskDateInput onDateChange={setTaskDate} date={taskDate} />
         <TaskCategoryInput onSelect={setTaskCategory} category={taskCategory} />
         <PriorityInput priority={taskPriority} setPriority={setPriority} />
         <InterestInput interest={taskInterest} setInterest={setInterest} />
         <DifficultyInput difficulty={taskDifficulty} setDifficulty={setDifficulty} />
         <DurationInput durationText={durationText} duration={taskDuration} setDuration={setDuration} />

         <Button 
         title="SAVE TASK"
         onPress={updateTask}
         accessibilityLabel='Tap to save updated task'
         />
         <Button 
         title="CANCEL"
         onPress={resetTask}
         accessibilityLabel='Tap to cancel'
         />

      </ScrollView>
    )
   }


export default connect(mapState, mapDispatch)(EditDetails);