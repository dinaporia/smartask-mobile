import React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import Home from './Home';
import AddDetails from './AddDetails';
import EditDetails from './EditDetails';
import ListPage from './ListPage';
import ScheduleView from './ScheduleView';
import AddTaskPage from './AddTaskPage';
import Preferences from './Preferences';



// function returns an object with Screen and Navigator properties

const Stack = createStackNavigator();

function Navigation() {
    return (
    // Navigator contains Screen elements as its children
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ 
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
                }}
        >
            <Stack.Screen name="Home"
            component={Home}
            options={{ 
                title: "Home", 
            }}
            />
            <Stack.Screen name="Add"
            component={AddTaskPage}
            options={{ title: "Add a task" }}
            />
            <Stack.Screen name="Details"
            component={AddDetails}
            options={{ title: "Add task details" }}
            />
            <Stack.Screen name="Edit"
            component={EditDetails}
            options={{ title: "Edit task" }}
            />
            <Stack.Screen 
                name="List"
                component={ListPage}
                options={{ title: "Task list" }}
            />
            <Stack.Screen name="Schedule"
            component={ScheduleView}
            options={{ title: "Today's tasks" }}
            />
            <Stack.Screen name="Prefs"
            component={Preferences}
            options={{ title: "Preferences" }}
            />
    
        </Stack.Navigator>
    )
  }
  
export default Navigation;
