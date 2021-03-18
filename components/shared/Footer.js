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

const Footer = ({ tasks }) => {
  const dispatch = useDispatch();
  const completedTasks = tasks.filter((task) => task.completed);
  const removeCompleted = () =>
    completedTasks.forEach((task) => dispatch(removeTask(task.id)));

  return (
    <View style={{ alignSelf: 'stretch'}}>
      <Animatable.View animation="slideInDown" duration={1300}>
        {/* button to remove filtered tasks that are completed */}
        <Button
          buttonStyle={{ backgroundColor: "red" }}
          raised
          title="CLEAR COMPLETED"
          buttonStyle={{ backgroundColor: "#e84a5f" }}
          onPress={() =>
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
          }
          accessibilityLabel="Tap to remove completed tasks"
        />
      </Animatable.View>
      <TaskCounter
        completedTasks={completedTasks.length}
        remainingTasks={tasks.filter((task) => !task.completed).length}
        totalTasks={tasks.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export { TaskCounter };
export default Footer;
