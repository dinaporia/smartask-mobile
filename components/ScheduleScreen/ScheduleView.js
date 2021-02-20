import React, {useEffect} from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import AlertAsync from "react-native-alert-async";
import { connect } from 'react-redux';

import { RenderTaskList, TaskCounter } from '../shared';
import { createSchedule, removeTaskFromSchedule } from '../../redux/scheduleSlice';
import { buildSchedule } from './utilities';


const mapState = state => {
   return {
      tasks: state.tasks,
      prefs: state.schedulePrefs,
      scheduleObject: state.schedule,
   }
};

const mapDispatch = { createSchedule, removeTaskFromSchedule }; 

const ScheduleView = (props) => {
   const { tasks, prefs, scheduleObject } = props;
   const {schedule, forDate, notToday, queued} = scheduleObject;
   const todaysTasks = tasks.filter(task => schedule.includes(task.id))
   const date = new Date();
   const today = date.toISOString().substring(0, 10);
   const scheduleSettings = {
      tasks: tasks,
      prefs: prefs,
      queued: queued,
      createSchedule: props.createSchedule
  };

   //  rebuilds schedule from tasks that haven't been rescheduled
   const updateSchedule = () => {
      // if notToday is current, exclude those tasks
      const updatedTasks = (today === forDate) ?
         tasks.filter(task => !notToday.includes(task.id)) :
         tasks.slice();
         buildSchedule({...scheduleSettings, tasks: updatedTasks});

   }

   const rescheduleTask = (taskId) => {
      props.removeTaskFromSchedule(taskId);
   }

   // on mount, build new schedule if not already there
   useEffect( () => {
      if (schedule.length === 0) {
         buildSchedule(scheduleSettings);
      }
   });
   
   return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white', paddingBottom: 40}}>
         <View>
            <RenderTaskList tasks={todaysTasks} canReschedule selectTask={rescheduleTask} />
            <Button 
               containerStyle={{margin: 20}}
               title='Update Schedule'
               onPress={() => updateSchedule(tasks)}
            />
         </View>
            
         <View style={{alignItems: 'stretch'}}>
            <TaskCounter completedTasks={todaysTasks.filter(task => task.completed).length} remainingTasks={todaysTasks.filter(task => !task.completed).length} totalTasks={todaysTasks.length} />
         </View>
      </SafeAreaView> 
   );

}
export default connect(mapState, mapDispatch)(ScheduleView);