import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { connect, useSelector } from 'react-redux';
import RenderTaskList from './RenderTaskList';
import { createSchedule, rebuildSchedule, removeTaskFromSchedule } from '../redux/scheduleSlice';


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
  
   let todaysTasks = tasks.filter(task => schedule.includes(task.id))
  

   const buildSchedule = (tasks, prefs) => {
      const {hours, maxHard, maxTedious, includeFun } = prefs;
      let schedule = tasks.map(task => task.id);
   
      props.createSchedule(schedule);
      console.log(JSON.stringify(schedule))
   }
    
   const reschedule = (taskId) => {
      props.removeTaskFromSchedule(taskId);
      
   }
 
   
   return (
      <View>
         <Button 
         title='generate schedule'
         onPress={() => buildSchedule(tasks, prefs)}
         />
         <RenderTaskList tasks={todaysTasks} forPage="schedule" selectTask={reschedule} />
      </View> 
   );

}
export default connect(mapState, mapDispatch)(ScheduleView);