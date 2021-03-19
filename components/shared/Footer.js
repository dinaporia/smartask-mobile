import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";

import { removeTask } from "../../redux/tasksSlice";
import * as Animatable from "react-native-animatable";

// counter returns amount of total, completed, and uncompleted task
const TaskCounter = ({ totalTasks, completedTasks, remainingTasks }) => {
  return (
    <Animatable.View
      animation="slideInUp"
      duration={1300}
      style={styles.container}
    >
      <View style={{ flex: 2 }}>
        <Text style={styles.count}>{totalTasks}</Text>
        <Text style={styles.text}>total</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.count}>{completedTasks}</Text>
        <Text style={styles.text}>completed</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.count}>{remainingTasks}</Text>
        <Text style={styles.text}>to do</Text>
      </View>
    </Animatable.View>
  );
};


const Footer = ({ tasks, clearBtn = false, updateSchedule = false }) => {
  const dispatch = useDispatch();

  let pressFunction, titleText, labelText;
  const completedTasks = tasks.filter((task) => task.completed);
  const remainingTasks = tasks.filter((task) => !task.completed).length;

  const removeCompleted = () =>
    completedTasks.forEach((task) => dispatch(removeTask(task.id)));

  // button changes depending on passed in props
  if (clearBtn) {
    pressFunction = () => {
      Alert.alert(
        "Remove Completed Tasks?",
        "This will permanently remove all currently visible completed tasks.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: removeCompleted,
          },
        ],
        { cancelable: false }
      )
    };
    titleText = "CLEAR COMPLETED";
    labelText = "Tap to remove completed tasks";
  } else if (updateSchedule) {
    pressFunction = () => updateSchedule(tasks);
    titleText = "Update Schedule";
    labelText = "Tap to generate new schedule"
  }

  return (
    <View 
     style={styles.wrapper}>
      <Button
        raised
        title={titleText}
       
        onPress={pressFunction}
        accessibilityLabel={labelText}
        titleStyle={{color: "white"}}
        buttonStyle={{ 
          backgroundColor: "#e84a5f", 
          height: 60 }}
      />
      <TaskCounter
        completedTasks={completedTasks.length}
        remainingTasks={remainingTasks}
        totalTasks={tasks.length}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "flex-end",
    flex: 1,
    position: 'absolute',
    bottom: 20,
    width: '100%',
    zIndex: 1
  },
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginTop: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 10,
  },
  count: {
    textAlign: "center",
    fontSize: 14,
  },
});


export default Footer;
