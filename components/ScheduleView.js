import React, {useEffect} from 'react';
import { View, ScrollView, StyleSheet, Modal, Alert, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import AlertAsync from "react-native-alert-async";
import RenderTaskList from './RenderTaskList';
import { createSchedule, rebuildSchedule, removeTaskFromSchedule } from '../redux/scheduleSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

const mapState = state => {
   return {
      tasks: state.tasks,
      prefs: state.schedulePrefs,
      scheduleObject: state.schedule,
   }
};

const mapDispatch = { createSchedule, rebuildSchedule, removeTaskFromSchedule }; 

const ScheduleView = (props) => {
   const { tasks, prefs, scheduleObject } = props;
   const {schedule, forDate, notToday, queued} = scheduleObject;
   const todaysTasks = tasks.filter(task => schedule.includes(task.id))

   const date = new Date();
   const today = date.toISOString().substring(0, 10);
   date.setDate(date.getDate() + 1);
   const tomorrow = date.toISOString().substring(0, 10);

   // alert if schedule generation fails
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
   // alert if no fun tasks were included in schedule
   const soBusyAlert = () => Alert.alert(
      'No fun day!',
      'Either your schedule is so busy, there is no time left for fun tasks today, or you haven\'t added any fun tasks. Hopefully, you can squeeze some in later!',
      [
         {
            text: 'OK',
         }
      ],
      { cancelable: false }
   );
   // alert if too many urgent tasks
   const tooManyAlert = () => Alert.alert(
      'Sort out your priorities!',
      'You have a lot of tasks due today or tomorrow - or one of them takes a long time. If possible, update some due dates or durations for better functionality.',
      [
         {
            text: 'OK',
         }
      ],
      { cancelable: false }
   );
   // alert if all tasks are completed
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
   // alert if no tasks exist
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
   const buildSchedule = async (tasks) => {
      let {hours, maxHard, maxTedious, includeFun } = prefs;
      let schedule = [];
      let todos = [];
      // if no fun tasks need to be included, mark true
      let funIncluded = !includeFun;

      const updateCounters = (task) => {
         hours -= task.duration;
         if (task.interest === 3) {
            funIncluded = true;
         } else if (task.interest === 1) {
            maxTedious--;
         }
         if (task.difficulty === 4)  maxHard--;
      };

      //  check that tasks exist that have not been completed or rescheduled
      if (!tasks || tasks.length === 0) {
         return noTasksAlert();
      } else { 
         todos = tasks.filter(task => !task.completed);
         if (todos.length === 0) {
            return allDoneAlert();
         } else {
            if (todos.length === 0) {
               return allDoneAlert();
            } else {
            // main scheduling algorithm
               scheduleGenerator: { 
                  // add queued tasks
                  if (queued.length > 0) {
                     // retrieve tasks from todos
                     const queuedTasks = todos.filter(task => queued.includes(task.id));
                     queuedTasks.forEach(task => {
                     // update counters, add task id to schedule, update todos
                     updateCounters(task);
                     schedule.push(task.id);
                     todos = todos.filter(task => !schedule.includes(task.id))
                     });
                  }
                  // tasks that are due today or tomorrow are always added
                  const urgentTasks = todos.filter(task => {
                  if (task.due.substring(0,10) === today) return true;
                  if (task.due.substring(0,10) === tomorrow) return true;
                  });

                  if (urgentTasks) {
                     urgentTasks.forEach( task => {
                        updateCounters(task);
                        schedule.push(task.id);
                     });
                     todos = todos.filter(task => !schedule.includes(task.id))
                     // alert and finish schedule if urgents go over time
                     if (hours < 0) {
                        tooManyAlert();
                        break scheduleGenerator;
                     } 
                     // finish schedule if no time left, alert if no fun included
                     else if (hours === 0) {
                        if (!funIncluded) {
                           soBusyAlert();
                        } 
                        break scheduleGenerator;
                     }
                  }
                  // sort remaining tasks by date and priority
                  todos.sort((a, b) => a.priority - b.priority).sort((a, b) => a.due.localeCompare(b.due));

                  // include a fun task, if one is short enough to fit remaining time
                  if (!funIncluded) {
                     let funTasks = todos.filter(task => task.interest === 3);

                     if (funTasks.length > 0) {
                        // exclude difficult tasks if max reached
                        if (maxHard <= 0) {
                           funTasks = funTasks.filter( task => task.difficulty === 4); 
                        }
                        // exclude tasks that are too long for remaining time
                        funTasks = funTasks.filter( task => task.duration < hours);
                        // add task to schedule, update counters, continue
                        if (funTasks.length > 0) {
                           let funTask = funTasks[0];

                           schedule.push(funTask.id);
                           if (funTask.difficulty === 4) maxHard--;
                           hours -= funTask.duration;
                           funIncluded = true;
                           todos = todos.filter(task => task.id != funTask.id);
                        }
                        // *** ELSE ALERT THAT FUN TASKS ARE TOO LONG *** 
                     }   
                  }
                  // if most pressing task is too long for the entire time alotted
                  if (schedule.length === 0) {
                     // runs until a task is added to the schedule or no todos left
                     for (let i = 0; (schedule.length < 1); i++) {
                        // if no tasks left, all are too long & user chose not to add
                        if (i === todos.length) {
                           break scheduleGenerator;
                        }

                        let firstTask = todos[i];
                        if (hours > firstTask.duration) {
                           schedule.push(firstTask.id);
                           if (firstTask.difficulty === 4) maxHard--;
                           if (firstTask.interest === 1) maxTedious--;
                           hours -= firstTask.duration;
                           todos = todos.filter(task => task.id !== firstTask.id);
                       } else {
                        // if task too long, let user decide whether to schedule it
                           const scheduleIt = await AlertAsync(
                              'Very Long Task',
                              `\'${firstTask.task}\' is the most pressing, but it would take up all your time today. Is that OK?`,
                              [
                                 {
                                    text: 'Schedule it',
                                    onPress: () => 'yes'
                                 },
                                 {
                                    text: 'No, skip it',
                                    onPress: () => Promise.resolve('no')
                                 }
                                 
                              ],
                              { cancelable: false }
                           ); 
                        
                           if (scheduleIt === 'yes') {
                              schedule.push(firstTask.id);
                              todos = todos.filter(task => task.id !== firstTask.id);
                              break scheduleGenerator;
                           }
                        }   
                     }
                  }
                  
                  // add tasks from todos until schedule is full
                  todos.forEach( task => {
                     if (task.duration <= hours) {
                        // check against difficulty and tedium counters
                        if (((task.difficulty === 4) && (maxHard <= 0)) || 
                            ((task.interest === 1) && (maxTedious <= 0))) {
                           return;
                        } else {
                           updateCounters(task);
                           schedule.push(task.id);
                        }
                     }
                  });
               } // end of scheduleGenerator loop
            }

            if (schedule.length > 0) {
               props.createSchedule({schedule: schedule, forDate: today});
            } else {
               somethingWrongAlert();
            }
         }
      }
   }

   //  rebuilds schedule from tasks that haven't been rescheduled
   const updateSchedule = () => {
      // if notToday is current, exclude those tasks
      const updatedTasks = (today === forDate) ?
         tasks.filter(task => !notToday.includes(task.id)) :
         tasks.slice();
      buildSchedule(updatedTasks);
   }

   const rescheduleTask = (taskId) => {
      props.removeTaskFromSchedule(taskId);
   }
   // on mount, build new schedule if not already there
   useEffect( () => {
      if (schedule.length === 0) {
         buildSchedule(tasks);
      }
   });
   
   return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
         <RenderTaskList tasks={todaysTasks} canReschedule selectTask={rescheduleTask} />
         <Button 
            containerStyle={{margin: 20}}
            title='Regenerate Schedule'
            onPress={() => updateSchedule(tasks)}
         />
      </SafeAreaView> 
   );

}
export default connect(mapState, mapDispatch)(ScheduleView);