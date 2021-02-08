import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import ListPage from './ListPage';
import ScheduleView from './ScheduleView';
import AddTaskPage from './AddTaskPage';
import Preferences from './Preferences';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const screenOptionStyle = {
    gestureEnabled: false,
    headerStyle: {
        backgroundColor: 'pink',
    },
    headerTintColor: 'indigo',
    headerTitleStyle: {
        fontWeight: 'bold', 
        textShadowColor: 'white',
        textShadowRadius: 5
    },
};

const HomeNavigator = () => {
    return (
        <Stack.Navigator 
            screenOptions={screenOptionStyle}
            initialRouteName="Home"
        >
            <Stack.Screen 
                name="Home"
                component={Home}
            />
            <Stack.Screen 
                name="Add"
                component={AddTaskPage}
                options={{ title: "Add a task" }}
            />
            <Stack.Screen 
                name="Schedule"
                component={ScheduleView}
                options={{ title: "Today's Tasks" }}
            />
            <Stack.Screen 
                name="List"
                component={ListPage}
                options={{ title: "Task List" }}
                
            />
            <Stack.Screen 
                name="Prefs"
                component={Preferences}
                options={{ title: "Preferences" }}
            />
        </Stack.Navigator>
    );
};

const TaskNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}
        >
            <Stack.Screen 
                name="Add"
                component={AddTaskPage}
                options={{ title: "Add a task" }}
            />
        </Stack.Navigator>
    );
};

const ScheduleNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}
        >
        <Stack.Screen 
            name="Schedule"
            component={ScheduleView}
            options={{ title: "Today's Tasks" }}
        />
        </Stack.Navigator>
    );
};

const ListNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}
        defaultNavigationOptions
        >
        <Stack.Screen 
            name="List"
            component={ListPage}
            options={{ title: "Task List" }}
  
        />
        </Stack.Navigator>
    );
};

const PrefsNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}
        >
        <Stack.Screen 
            name="Prefs"
            component={Preferences}
            options={{ title: "Preferences" }}
        />
        </Stack.Navigator>
    );
};


const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen 
                name="Home" 
                component={HomeNavigator}
            />
            <Drawer.Screen 
                name="Add Task" 
                component={TaskNavigator}
            />
            <Drawer.Screen 
                name="View Tasks" 
                component={ListNavigator}
            />
            <Drawer.Screen 
                name="View Schedule" 
                component={ScheduleNavigator}
            />
            <Drawer.Screen 
                name="Prefs" 
                component={PrefsNavigator}
            />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;