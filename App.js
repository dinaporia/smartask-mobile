import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Home = () => {
  return (
  <View style={styles.container}>
      <Text>SmarTask!</Text>
      <StatusBar style="auto" />
    </View>
  );
}


function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name="Home"
      component={Home}
      options={{ title: "SmarTasking" }}
      />
      <Stack.Screen name="Details"
      component={AddDetails}
      options={{ title: "Add Details" }}
      />
      <Stack.Screen name="Edit"
      component={editDetails}
      options={{ title: "Edit Task" }}
      />
      <Stack.Screen name="List"
      component={ListPage}
      options={{ title: "Tasks" }}
      />
      <Stack.Screen name="Schedule"
      component={ScheduleView}
      options={{ title: "Today's Tasks" }}
      />

    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
