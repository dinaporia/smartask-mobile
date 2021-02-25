import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";

import Home from "./Home";
import ListPage from "./ListScreen/ListPage";
import ScheduleView from "./ScheduleScreen/ScheduleView";
import AddTaskPage from "./AddTaskScreen/AddTaskPage";
import Preferences from "./PreferencesScreen";

const Drawer = createDrawerNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#2a363b",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    textShadowRadius: 5,
    color: "white",
  },
  headerTitleAlign: 'center',
  headerShown: true
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Icon 
            name='bars'
            type='font-awesome'
            color='white'
            size={30}
            iconStyle={{paddingHorizontal: 20}}
            onPress={() => navigation.openDrawer()}
          />
        )
      })} 
    >
      <Drawer.Screen 
        name="Home" 
        component={Home} 
        options={{
          gestureEnabled: false
        }}
      />
      <Drawer.Screen
        name="Add"
        component={AddTaskPage}
        options={{ 
          ...screenOptionStyle,
          title: "Add a task",
           }}
      />
      <Drawer.Screen
        name="List"
        component={ListPage}
        options={{ 
          ...screenOptionStyle,
          title: "Task List" }}
      />
      <Drawer.Screen
        name="Schedule"
        component={ScheduleView}
        options={{  ...screenOptionStyle,
        title: "Today's Tasks" }}
      />
      <Drawer.Screen
        name="Prefs"
        component={Preferences}
        options={{  ...screenOptionStyle,
        title: "Settings" }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
