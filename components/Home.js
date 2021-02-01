import React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';

const Home = ({navigation}) => {

    return (

      <View style={styles.container}>
        <Text>SmarTask!</Text>
        <Button title="Add new task" onPress={() => navigation.navigate('Add')}
        />
        <Button title="View today's tasks" onPress={() => navigation.navigate('Schedule')}
        />
        <Button title="View all tasks" onPress={() => navigation.navigate('List')}
        />
        <Button title="Change preferences" onPress={() => navigation.navigate('Prefs')}
        />

      </View>
    );
  }
  

  
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  export default Home;