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
              color="#13294B"
              size={40}
              iconStyle={{ paddingRight: 30 }}
            />
          }
          title="ADD TASK"
          titleStyle={{color: "#13294B"}}
          raised
          onPress={() => navigation.navigate("Add")}
          buttonStyle={styles.button}
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
              color="#13294B"
              size={30}
              iconStyle={{ paddingRight: 30 }}
            />
          }
          title="VIEW ALL"
          titleStyle={{color: "#13294B"}}
          raised
          onPress={() => navigation.navigate("List")}
          buttonStyle={styles.button}
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
              color="#13294B"
              size={30}
              iconStyle={{ paddingRight: 30 }}
            />
          }
          title="SCHEDULE"
          titleStyle={{color: "#13294B"}}
          raised
          onPress={() => navigation.navigate("Schedule")}
          buttonStyle={styles.button}
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
              color="#13294B"
              size={30}
              iconStyle={{ paddingRight: 30 }}
            />
          }
          title="SETTINGS"
          titleStyle={{color: "#13294B"}}
          raised
          onPress={() => navigation.navigate("Prefs")}
          buttonStyle={styles.button}
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
    backgroundColor: "#13294B",
  },
  button: {
    backgroundColor: "#8BD3E6",
    width: 200,
    height: 60,
  }
});

export default Home;
