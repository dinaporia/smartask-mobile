
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './components/Navigation';



export default function App() {
  return (
// component manages navigation tree and contains the navigation state
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
