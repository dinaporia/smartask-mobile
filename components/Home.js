import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';


const Home = ({navigation}) => {

    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
          <Button title="ADD NEW TASK" onPress={() => navigation.navigate('Add')}
          />
          <Button title="VIEW TODAY'S TASKS" onPress={() => navigation.navigate('Schedule')}
          />
          <Button title="VIEW ALL TASKS" onPress={() => navigation.navigate('List')}
          />
          <Button title="CHANGE PREFERENCES" onPress={() => navigation.navigate('Prefs')}
          />
        </ThemeProvider>
      </View>
    );
  }
  
// styling for react native elements
const theme = {
  Button: {
    raised: true,
    buttonStyle: {
      backgroundColor: 'pink',
      width: 250,
      height: 75,  
    },
    titleStyle: {
      color: 'indigo'
    },
    containerStyle: {
      marginBottom: 25
    }
  }
};
  
// stylesheet 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
export default Home;