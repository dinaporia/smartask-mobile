import React, { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Button } from "react-native-elements";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import { TaskCategoryInput, TaskNameInput, TaskDateInput } from "../shared";
import AddDetails from "./AddDetails";
import { addTask } from "../../redux/tasksSlice";
import * as Animatable from "react-native-animatable";

const AddTaskPage = (props) => {
  const dispatch = useDispatch();
  // retrieve default task settings from store
  const defaultTask = useSelector((state) => state.taskPrefs);
  // hooks for new task object
  const [taskText, setTaskText] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskCategory, setTaskCategory] = useState(defaultTask.category);
  // hook for modal
  const [showModal, setShowModal] = useState(false);
  // store basic task object to pass either to store or details page
  const newTask = { task: taskText, due: taskDate, category: taskCategory };

  // reset local state
  const resetBasics = () => {
    setTaskText("");
    setTaskDate("");
    setTaskCategory("");
    setShowModal(false);
  };

  const nameReqAlert = () => {
    Alert.alert(
      "Task name required",
      "Please name your task, so you'll know what it is!",
      [
        {
          text: "OK",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const dateReqAlert = () => {
    Alert.alert(
      "Due date required",
      "Please enter a due date to ensure smooth scheduling functionality!",
      [
        {
          text: "OK",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  // add complete task object to store, navigate to list page
  const createTask = (task) => {
    if (!taskText) {
      nameReqAlert();
      if (showModal) setShowModal(false);
      return;
    }
    if (!taskDate) {
      dateReqAlert();
      if (showModal) setShowModal(false);
      return;
    }
    // merge defaults with new input
    const newTask = { ...defaultTask, ...task };
    dispatch(addTask(newTask));
    props.navigation.navigate("List");
    resetBasics();
  };

  return (
    <SafeAreaView style={{ flex: 1,  backgroundColor: "#13294B" }}>
      <View style={{ flex: 1 }}>
        <Animatable.View
          animation="flipInY"
          duration={1300}
          style={styles.inputs}
        >
          <TaskNameInput onTextChange={setTaskText} task={taskText} />
          <TaskDateInput onDateChange={setTaskDate} date={taskDate} />
          <TaskCategoryInput
            onSelect={setTaskCategory}
            category={taskCategory}
            showLabel
          />
        </Animatable.View>

        <Animatable.View
          animation="slideInUp"
          duration={1300}
          style={styles.container}
        >
          {/* add basic task to store, leaving default details */}
          <Button
            containerStyle={{ flex: 1, marginHorizontal: 5 }}
            title="QUICK ADD"
            onPress={() => createTask(newTask)}
            accessibilityLabel="Tap to quickly add task basics"
            titleStyle={{color: "#13294B"}}
            buttonStyle={{ 
              backgroundColor: "#8BD3E6", 
              height: 60 }}
          />
          {/* open modal for details without adding task to store */}
          <Button
            containerStyle={{ flex: 1, marginHorizontal: 5 }}
            title="ADD DETAILS"
            onPress={() => {
              !taskText
                ? nameReqAlert()
                : !taskDate
                ? dateReqAlert()
                : setShowModal(true);
            }}
            accessibilityLabel="Tap to add more details to task"
            titleStyle={{color: "white"}}
            buttonStyle={{ 
              backgroundColor: "#e84a5f", 
              height: 60,
              }}
          />
        </Animatable.View>
      </View>

      {/* modal displays details input */}
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        {/* receives new task object, passes details input back to createTask */}
        <AddDetails
          taskBasics={newTask}
          createTask={createTask}
          defaultTask={defaultTask}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    
  },
  inputs: {
    flex: 2,
    margin: 20,
    padding: 10,
    justifyContent: "flex-start",
    borderColor: "#e84a5f",
    borderWidth: 1,
    backgroundColor: '#CCCCD9'
  },
  button: {
    backgroundColor: "#8BD3E6",
    width: 200,
    height: 60,
  }
});

export default AddTaskPage;
