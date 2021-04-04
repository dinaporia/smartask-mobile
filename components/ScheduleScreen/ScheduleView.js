import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import * as Animatable from "react-native-animatable";
import { Text } from 'react-native';

import { RenderTaskList, Footer } from "../shared";
import { createSchedule, removeTaskFromSchedule } from "../../redux/scheduleSlice";
import { buildSchedule } from "./utilities";


const ScheduleView = () => {
  const dispatch = useDispatch();
  const dispatchSchedule = (object) => {
    dispatch(createSchedule(object));
  };

  const tasks = useSelector((state) => state.tasks);
  const prefs = useSelector((state) => state.schedulePrefs);
  const schedule = useSelector((state) => state.schedule.schedule);
  const forDate = useSelector((state) => state.schedule.forDate);
  const notToday = useSelector((state) => state.schedule.notToday);
  const queued = useSelector((state) => state.schedule.queued);

  const today = new Date().toISOString().substring(0, 10);
  const todaysTasks = tasks.filter((task) => schedule.includes(task.id));

  const scheduleSettings = {
    tasks: tasks,
    prefs: prefs,
    queued: queued,
    createSchedule: dispatchSchedule,
  };

  //  rebuilds schedule from tasks that haven't been rescheduled today
  const updateSchedule = () => {
    const updatedTasks = tasks.filter((task) => !notToday.includes(task.id));
    buildSchedule({ ...scheduleSettings, tasks: updatedTasks });
  };

  const rescheduleTask = (taskId) => {
    dispatch(removeTaskFromSchedule(taskId));
  };

  // build new schedule if not already there
  if (today != forDate) {
    buildSchedule(scheduleSettings);
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", paddingBottom: 40, backgroundColor: "#CCCCD9" }}
    >
    <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingBottom: 20, color: '#13294B'}}>
      TASKS FOR {(new Date()).toLocaleDateString("en-US")}
    </Text>
      <Animatable.View animation="slideInLeft" duration={1300}>
          <RenderTaskList
          tasks={todaysTasks}
          canReschedule
          selectTask={rescheduleTask}
         />
        
      </Animatable.View>

      <Footer tasks={todaysTasks} updateSchedule={updateSchedule} />

    </SafeAreaView>
  );
};

export default ScheduleView;
