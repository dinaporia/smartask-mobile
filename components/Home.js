import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import Overlay from "react-native-modal-overlay";
import * as Animatable from "react-native-animatable";

const Home = ({ navigation }) => {
  // const [isOverlayOpen, setIsOverlayOpen] = useState(true);

  // const toggleOverlay = () => {
  //   setIsOverlayOpen(!isOverlayOpen);
  // };

  return (
    //   <Overlay
    //     visible={isOverlayOpen}
    //     onClose={toggleOverlay}
    //     closeOnTouchOutside
    //     animationType="slideInDown"
    //     duration={1300}
    //   >
    //     <Text style={{ fontSize: 26, marginBottom: 20, fontWeight: "bold" }}>
    //       Welcome to SmartTask
    //     </Text>
    //     <Button
    //       title="READY TO DO"
    //       buttonStyle={{ backgroundColor: "#e84a5f", height: 44 }}
    //       onPress={() => toggleOverlay()}
    //     />
    //   </Overlay>
    // ) : (
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
