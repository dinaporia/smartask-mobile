
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-elements';
import { Provider } from 'react-redux';

import DrawerNavigator from './components/Navigation';
import store from './redux/store';

const theme = {
  Button: {
    raised: true,
    backgroundColor: 'pink'
  }
};


export default function App() {
  return (
  
  <Provider store={store}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <DrawerNavigator />
        </ThemeProvider>
      </NavigationContainer>
  </Provider>
  
  );
}
