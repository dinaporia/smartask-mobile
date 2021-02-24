import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";

import DrawerNavigator from "./components/Navigation";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
}
