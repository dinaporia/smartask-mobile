import React, {useEffect} from 'react';
import { View, ScrollView, StyleSheet, Modal, Alert, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import RenderTaskList from './RenderTaskList';
import { createSchedule, rebuildSchedule, removeTaskFromSchedule } from '../redux/scheduleSlice';


const mapState = state => {
   return {
      tasks: state.tasks,
      prefs: state.schedulePrefs,
      schedule: state.schedule.schedule,
      forDate: state.schedule.forDate,
      notToday: state.schedule.notToday
   }
};

const mapDispatch = { createSchedule, rebuildSchedule, removeTaskFromSchedule }; 


const ScheduleView = (props) => {
   const { tasks, prefs, schedule, forDate, notToday } = props;
   const todaysTasks = tasks.filter(task => schedule.includes(task.id))

   const date = new Date();
   const today = date.toISOString().substring(0, 10);
   date.setDate(date.getDate() + 1);
   const tomorrow = date.toISOString().substring(0, 10);

   // runs if no tasks exist
   const noTasksAlert = () => Alert.alert(
      'Task List Empty',
      'Add some tasks to generate a schedule!',
      [
         {
            text: 'OK',
            onPress: () => props.navigation.navigate('Add')
         }
     ],
     { cancelable: false }
   );

   // builds new schedule from all tasks
   const buildSchedule = (tasks) => {
      let {hours, maxHard, maxTedious, includeFun } = prefs;
      let schedule = [];
      let todos = [];
      let scheduleIt = false;
      // if no fun tasks need to be included, mark true
      let funIncluded = (!includeFun) ? true : false;
      // get today and tomorrow's dates as strings 
      // dates are declared in component
               // const date = new Date();
               // const today = date.toISOString().substring(0, 10);
               // date.setDate(date.getDate() + 1);
               // const tomorrow = date.toISOString().substring(0, 10);

      // alerts for non-optimal schedule builds
      const somethingWrongAlert = () => Alert.alert(
         'Something went wrong!',
         'Most likely, your alotted daily time is shorter than any of your tasks. Change your preferences or task durations and try again. \nIf you think something else is causing this error, please submit feedback to the developer.',
         [
            {
               text: 'OK',
            }
         ],
         { cancelable: false }
      );
      const soBusyAlert = () => Alert.alert(
         'No fun day!',
         'Your schedule is so busy, there is no time left for fun tasks today... Hopefully, you can squeeze some in later!',
         [
            {
               text: 'OK',
            }
         ],
         { cancelable: false }
      );
      const pressingAlert = () => Alert.alert(
         'Very Long Task',
         'This task is the most pressing, but it would take up all your time today. Is that OK?',
         [
            {
               text: 'No, skip it',
               style: 'cancel',
            },
            {
               text: 'Schedule it',
               onPress: () => (scheduleIt = true)
            }
        ],
        { cancelable: false }
      ); 
      const allDoneAlert = () => Alert.alert(
         'All done!',
         'All your tasks are marked as completed. Add some more to generate a schedule!',
         [
            {
               text: 'OK',
               onPress: () => props.navigation.navigate('Add')
            }
         ],
         { cancelable: false }
      );
      const tooManyAlert = () => Alert.alert(
         'Sort out your priorities!',
         'You have too many tasks due today or tomorrow. If possible, update some due dates for better functionality.',
         [
            {
               text: 'OK',
            }
         ],
         { cancelable: false }
      );
      // check tasks have been added
      if (!tasks || tasks.length === 0) {
         return noTasksAlert();
      } else { 
         // retrieve tasks left to do
         todos = tasks.filter(task => !task.completed);
         // check todos exist
         if (todos.length === 0) {
            return allDoneAlert();
         } else {
            scheduleGenerator: { 
                // retrieve tasks that are due today or tomorrow
               const urgentTasks = todos.filter(task => {
               if (task.due.substring(0,10) === today) return true;
               if (task.due.substring(0,10) === tomorrow) return true;
               });
                // add all urgent tasks to schedule
               if (urgentTasks) {
                  // update todos array
                  todos = todos.filter(task => !urgentTasks.includes(task))
                  // update schedule array
                  schedule = urgentTasks;
                  // for each task, track time remaining, difficulty, tedium, and fun
                  schedule.forEach( task => {
                     hours -= task.duration;
                     if (task.interest === 3) {
                        funIncluded = true;
                     } else if (task.interest === 1) {
                        maxTedious--;
                     }
                     if (task.difficulty === 4) {
                        maxHard--;
                     }
                  });
                  // if urgent tasks go over time alotted, alert, end build
                  if (hours < 0) {
                     tooManyAlert();
                     break scheduleGenerator;
                  } 
                  // if no time is left
                  // if no fun, alert
                  // end build
                  if (hours === 0) {
                     if (!funIncluded) {
                        soBusyAlert();
                     } 
                     break scheduleGenerator;
                  }
               }
   // the schedule is either empty or has some urgent tasks but there is time left
               // sort remaining todos by date and priority
               todos.sort((a, b) => a.priority - b.priority).sort((a, b) => a.due.localeCompare(b.due));
               // include a fun task
               if (!funIncluded) {
                  let funTasks = todos.filter(task => task.interest === 3);
                  // if fun tasks are available
                  if (funTasks.length > 0) {
                     // exclude difficult tasks if max reached
                     funTasks = funTasks.filter( task => {
                        if ((task.difficulty === 4) && (maxHard <= 0)) {
                           return false;
                        }
                        return true;
                     });
                     // exclude tasks that are too long for remaining time
                     funTasks = funTasks.filter( task => {
                        if (hours < task.duration) return false;
                        return true;
                     });
                     // add next fun task to schedule, update counters, update todos array
                     if (funTasks.length > 0) {
                        let funTask = funTasks[0];
                        schedule.push(funTask);
                        if (funTask.difficulty === 4) maxHard--;
                        funIncluded = true;
                        todos = todos.filter(task => task.id != funTask.id);
                     }
                  }   
               }
// the schedule is either empty or includes urgent tasks and/or a fun task
               // if no tasks have been added yet, add next task
               if (schedule.length <= 0) {
                  // runs until a task is added to the schedule or looped through all todos
                  for (let i = 0; (schedule.length < 1); i++) {
                     // if we've looped through the entire todos, there are no other tasks to add
                     if (i === todos.length) {
                        break scheduleGenerator;
                     }
                     let firstTask = todos[i];
                     // if task takes up all alotted time, alert
                     if (hours <= firstTask.duration) {
                        pressingAlert();
                        // if user says ok, add task, build schedule
                        // if user cancels, continue loop
                        if (scheduleIt) {
                           schedule.push(firstTask);
                           todos = todos.filter(task => task.id !== firstTask.id);
                           break scheduleGenerator;
                        }
                     }   
                  }
               }
               // add tasks from todos until schedule is full or no todos left
               todos.forEach( task => {
                  // if enough time remains for task 
                  if (task.duration < hours) {
                     // check against difficulty and tedium counters
                     if (
                        !((task.difficulty === 4) && (maxHard <= 0)) || 
                        !((task.interest === 1) && (maxTedious <= 0))
                        ) {
                           // add task
                           schedule.push(task);
                           // update counters
                           if (task.difficulty === 4) maxHard--;
                           if (task.interest === 1) maxTedious--;
                           hours -= task.duration;
                     }
                  }
               });
            } // end of scheduleGenerator loop

            if (schedule.length > 0) {
            // get ids of all tasks in schedule array, pass to reducer
            schedule = schedule.map(task => task.id);
            props.createSchedule({schedule: schedule, forDate: today});
            } else {
               somethingWrongAlert();
            }

         }
      }
   }
   //  rebuilds schedule from tasks that haven't been rescheduled
   const updateSchedule = () => {
      const updatedTasks = tasks.filter( task => !notToday.includes(task.id));
      buildSchedule(updatedTasks);
   }
   
   const rescheduleTask = (taskId) => {
      props.removeTaskFromSchedule(taskId);
   }



   useEffect( () => {
      if (schedule.length === 0) {
         buildSchedule(tasks);
      }
   });
   
 
   return (
      <View>
         <RenderTaskList tasks={todaysTasks} canReschedule selectTask={rescheduleTask} />
         <Button 
         title='Regenerate Schedule'
         onPress={() => updateSchedule(tasks)}
         />
      </View> 
   );

}
export default connect(mapState, mapDispatch)(ScheduleView);