import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TaskPrefs from "./TaskPrefs";
import SchedulePrefs from "./SchedulePrefs";

const Tab = createBottomTabNavigator();

const Preferences = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "white",
        activeBackgroundColor: "#2a363b",
        inactiveBackgroundColor: "#7c7575",
        tabStyle: { justifyContent: "center" },
        labelStyle: { fontSize: 16 },
      }}
    >
      <Tab.Screen
        name="TaskPrefs"
        component={TaskPrefs}
        options={{
          tabBarLabel: "TASK",
        }}
      />
      <Tab.Screen
        name="SchedulePrefs"
        component={SchedulePrefs}
        options={{
          tabBarLabel: "SCHEDULE",
        }}
      />
    </Tab.Navigator>
  );
};

export default Preferences;
