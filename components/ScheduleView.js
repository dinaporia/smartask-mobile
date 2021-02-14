import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Modal, Alert, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect, useSelector } from 'react-redux';
import RenderTaskList from './RenderTaskList';
import { createSchedule, rebuildSchedule, removeTaskFromSchedule } from '../redux/scheduleSlice';
import { parseISO } from 'date-fns';


const mapState = state => {
   return {
      tasks: state.tasks,
      prefs: state.schedulePrefs,
      schedule: state.schedule.schedule
   }
};

const mapDispatch = { createSchedule, rebuildSchedule, removeTaskFromSchedule }; 


const ScheduleView = (props) => {
   const { tasks, prefs, schedule } = props;
   const todaysTasks = tasks.filter(task => schedule.includes(task.id))
  


   // const buildSchedule = (tasks) => {
   //    let schedule = [];
   //    let hard = 0;
   //    let tedious = 0;
   //    const {hours, maxHard, maxTedious, includeFun } = prefs;

   //    // if no fun tasks need to be included, mark true
   //    let funIncluded = (!includeFun) ? true : false;

   //    // get today and tomorrow's dates as strings 
   //    const date = new Date();
   //    const today = date.toISOString().substring(0, 10);
   //    date.setDate(date.getDate() + 1);
   //    const tomorrow = date.toISOString().substring(0, 10);


   //    // CONVERT TO FUNCTION 
   //    const soBusyAlert = 'Your schedule is so busy, there is no time left for fun tasks today... Hopefully, you can squeeze some in later!';
   //    // OK, build schedule

   //    // CONVERT TO FUNCTION 
   //    const pressingAlert = 'This task is the most pressing, but it would take up all your time today. Is that OK?';
   //    // OK, build schedule
   //    // not OK keep going

   //    const noTasksAlert = () => Alert.alert(
   //          'Task List Empty',
   //          'Add some tasks to generate a schedule!',
   //          [
   //             {
   //                text: 'Cancel',
   //                style: 'cancel'
   //             },
   //             {
   //                text: 'OK',
   //                onPress: () => props.navigation.navigate('Add')
   //             }
   //         ],
   //         { cancelable: false }
   //       );

   //    const tooManyAlert = () => Alert.alert(
   //       'Everything is urgent!',
   //       'You have too many tasks due today or tomorrow. If possible, update some due dates for better functionality.',
   //       [
   //          {
   //             text: 'OK',
   //             onPress: () => props.createSchedule(schedule)
   //          }
   //       ],
   //       { cancelable: false }
   //    );


   //    // check that there are tasks to add
   //    if (!tasks) return noTasksAlert();

   //    // retrieve tasks left to do
   //    let todos = tasks.filter(task => !task.completed);
   //    if (todos.length === 0) return noTasksAlert();

   //    // retrieve tasks that are due today or tomorrow
   //    const urgentTasks = todos.filter(task => {
   //       if (task.due.substring(0,10) === today) return true;
   //       if (task.due.substring(0,10) === tomorrow) return true;
   //       });
      
   //    // add all urgent tasks to schedule
   //    if (urgentTasks) {
   //       // update todos array
   //       todos = todos.filter(task => !urgentTasks.includes(task))
   //       // update schedule array
   //       schedule = urgentTasks;
   //       // for each task, track time remaining, difficulty, tedium, and fun
   //       schedule.forEach( task => {
   //          hours -= task.duration;
   //          if (task.interest === 3) {
   //             funIncluded = true;
   //          } else if (task.interest === 1) {
   //             tedious++;
   //          }
   //          if (task.difficulty === 4) {
   //             hard++;
   //          }
   //       });
   //       // if urgent tasks go over time alotted
   //       if (hours < 0) return tooManyAlert();
   //       // if no time is left, check if fun was included
   //       if (hours === 0) {
   //          if (!funIncluded) {
   //             return soBusyAlert();
   //          } else {
   //             return props.createSchedule(schedule);
   //          }
   //       }
   //    }
   //    // sort remaining todos by date and priority
   //    todos.sort((a, b) => a.priority - b.priority).sort((a, b) => a.due.localeCompare(b.due));
   //    // make sure to include a fun task
   //    if (!funIncluded) {
   //       let funTasks = todos.filter(task => task.interest === 3);
   //       // if fun tasks are available
   //       if (funTasks.length > 0) {
   //          // add first fun task to schedule
   //          let funTask = funTasks[0];
   //          schedule.push(funTask);
   //          // check task difficulty
   //          if (funTask.difficulty === 4) hard++;
   //          // remove task from todos
   //          todos = todos.filter(task => task.id != funTask.id);
   //       }
   //       // mark fun included
   //       funIncluded = true;
   //    }
   //    // if no tasks have been added, add the first task regardless of duration
   //    if (schedule.length === 0) {
   //       let task = todos[0];
   //       schedule.push(task);
   //       if (task.difficulty === 4) hard++;
   //       if (task.interest === 1) {
   //          tedious++;
   //       }
   //       hours -= task.duration;
   //    }

   //    // for each remaining task
   //    todos.forEach( task => {
   //       // as long as there is time left
   //       if (hours > 0) {
   //          // if the task is shorter than the remaining time
   //          if (task.duration < hours) {
   //             if ((task.difficulty === 4) && (task.interest === 1)) {
   //                if (hard < maxHard) {
                     
   //                }
   //             }            
   //          }
   //       }
   //    })
   //    tasks = tasks.flatMap(task => {
   //       if (timeRemaining < task.duration) return [];
   //       timeRemaining -= task.duration;
   //       return task;
   //   });









   




   //    // map ids
   //    // props.createSchedule(schedule);
   // }
    
   const reschedule = (taskId) => {
      props.removeTaskFromSchedule(taskId);
      
   }
 
   
   return (
      <View>
         <Button 
         title='generate schedule'
         onPress={() => buildSchedule(tasks)}
         />
         <RenderTaskList tasks={tasks} canReschedule selectTask={reschedule} />
      </View> 
   );

}
export default connect(mapState, mapDispatch)(ScheduleView);