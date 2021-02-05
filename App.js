
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './components/Navigation';
import { ThemeProvider } from 'react-native-elements';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux'

const theme = {
  Button: {
    raised: true,
    backgroundColor: 'pink'
  }
};

const store = configureStore({
  reducer: rootReducer,
});

export default function App() {
  return (
  
  <Provider store={store}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <Navigation />
        </ThemeProvider>
      </NavigationContainer>
  </Provider>
  
  );
}
