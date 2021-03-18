import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";

const Home = ({ navigation }) => {
 
  return (

    <View style={styles.container}>
      <Animatable.View
        animation="slideInLeft"
        duration={1300}
        style={{ margin: 10 }}
      >
        <Button
          icon={
            <Icon
              name="plus-square-o"
              type="font-awesome"
              color="white"
              size={40}
              iconStyle={{ paddingRight: 30 }}
            />
          }
          title="ADD TASK"
          raised
          onPress={() => navigation.navigate("Add")}
          buttonStyle={{
            backgroundColor: "#e84a5f",
            width: 200,
            height: 60,
          }}
        />
      </Animatable.View>
      <Animatable.View
        animation="slideInRight"
        duration={1300}
        style={{ margin: 10 }}
      >
        <Button
          icon={
            <Icon
              name="list"
              type="font-awesome"
              color="white"
              size={30}
              iconStyle={{ paddingRight: 30 }}
            />
          }
          title="VIEW ALL"
          raised
          onPress={() => navigation.navigate("List")}
          buttonStyle={{
            backgroundColor: "#e84a5f",
            width: 200,
            height: 60,
          }}
        />
      </Animatable.View>
      <Animatable.View
        animation="slideInLeft"
        duration={1300}
        style={{ margin: 10 }}
      >
        <Button
          icon={
            <Icon
              name="calendar"
              type="font-awesome"
              color="white"
              size={30}
              iconStyle={{ paddingRight: 30 }}
            />
          }
          title="SCHEDULE"
          raised
          onPress={() => navigation.navigate("Schedule")}
          buttonStyle={{
            backgroundColor: "#e84a5f",
            width: 200,
            height: 60,
          }}
        />
      </Animatable.View>
      <Animatable.View
        animation="slideInRight"
        duration={1300}
        style={{ margin: 10 }}
      >
        <Button
          icon={
            <Icon
              name="sliders"
              type="font-awesome"
              color="white"
              size={30}
              iconStyle={{ paddingRight: 30 }}
            />
          }
          title="SETTINGS"
          raised
          onPress={() => navigation.navigate("Prefs")}
          buttonStyle={{
            backgroundColor: "#e84a5f",
            width: 200,
            height: 60,
          }}
        />
      </Animatable.View>
    </View>
  );
};

// stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default Home;
