import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './Home';
import ListPage from './ListScreen/ListPage';
import ScheduleView from './ScheduleScreen/ScheduleView';
import AddTaskPage from './AddTaskScreen/AddTaskPage';
import Preferences from './PreferencesScreen';

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
        <Stack.Navigator screenOptions={screenOptionStyle} >
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
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen 
                name="Home" 
                component={HomeNavigator}
            />
            <Drawer.Screen 
                name="Add" 
                component={TaskNavigator}
                options={{ title: "Add a task" }}
            />
            <Drawer.Screen 
                name="List" 
                component={ListNavigator}
                options={{ title: "Task List" }}
            />
            <Drawer.Screen 
                name="Schedule" 
                component={ScheduleNavigator}
                options={{ title: "Today's Tasks" }}
            />
            <Drawer.Screen 
                name="Prefs" 
                component={PrefsNavigator}
                options={{ title: "Preferences" }}
            />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;