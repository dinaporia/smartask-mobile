
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './components/Navigation';
import { ThemeProvider } from 'react-native-elements';

const theme = {
  Button: {
    raised: true,
    backgroundColor: 'pink'
  }
};

export default function App() {
  return (
   
// {/* component manages navigation tree and contains the navigation state */}
      <NavigationContainer>
       <ThemeProvider theme={theme}>
        <Navigation />
        </ThemeProvider>
      </NavigationContainer>
    
  );
}
