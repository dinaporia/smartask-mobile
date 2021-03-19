import React, { useState } from "react";
import { Text, View, Alert, StyleSheet } from "react-native";
import { Button, Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import {
  DurationInput,
  DifficultyInput,
  InterestInput,
  PriorityInput,
  TaskCategoryInput,
} from "../shared";
import {
  editDefaultTask,
  resetDefaultTask,
  defaultTask,
} from "../../redux/taskPrefsSlice";
import * as Animatable from "react-native-animatable";

// determines default settings for quick-added tasks
const TaskPrefs = () => {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.taskPrefs);

  const [category, setCategory] = useState(task.category);
  const [priority, setPriority] = useState(task.priority);
  const [difficulty, setDifficulty] = useState(task.difficulty);
  const [interest, setInterest] = useState(task.interest);
  const [duration, setDuration] = useState(task.duration);

  // send new task object to store
  const saveDefaultTask = () => {
    const newTask = {
      category: category,
      priority: priority,
      difficulty: difficulty,
      interest: interest,
      duration: duration,
    };
    dispatch(editDefaultTask(newTask));
    return Alert.alert("Your task defaults have been updated.");
  };

  // reset task defaults in store and local state
  const onTaskReset = () => {
    dispatch(resetDefaultTask());
    setCategory(defaultTask.category);
    setInterest(defaultTask.interest);
    setPriority(defaultTask.priority);
    setDifficulty(defaultTask.difficulty);
    setDuration(defaultTask.duration);
  };

  return (
    <>
      <View style={{ backgroundColor: "#13294B", padding: 10 }}>
        <Text
          style={{ paddingHorizontal: 5, textAlign: "center", color: "white", fontSize: 16 }}
        >
          Set the preferences used for quick-added tasks. 
        </Text>
      </View>
      <ScrollView>
        <Animatable.View
          animation="zoomIn"
          duration={1300}
          style={{ flex: 1, margin: 10, padding: 10, backgroundColor: "white" }}
        >
          <Card>
            <Card.Title>Category</Card.Title>
            <Card.Divider />
            <TaskCategoryInput onSelect={setCategory} category={category} />
          </Card>
          <PriorityInput priority={priority} setPriority={setPriority} />
          <InterestInput interest={interest} setInterest={setInterest} />
          <DifficultyInput
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
          <DurationInput duration={duration} setDuration={setDuration} />
          <View style={{ margin: 5, padding: 10 }}>
            <Button
              title="SAVE TASK PREFERENCES"
              raised
              titleStyle={{color: "#13294B"}}
              buttonStyle={{ 
                backgroundColor: "#8BD3E6", 
                height: 60 }}
              onPress={saveDefaultTask}
              accessibilityLabel="Tap to save task settings"
            />
            <Button
              containerStyle={{ marginTop: 10 }}
              raised
              titleStyle={{color: "white"}}
              buttonStyle={{ 
                backgroundColor: "#e84a5f", 
                height: 60,
                }}
              title="RESET TASK DEFAULTS"
              onPress={onTaskReset}
              accessibilityLabel="Tap to reset task defaults"
            />
          </View>
        </Animatable.View>
      </ScrollView>
    </>
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
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "white",
  },
});

export default TaskPrefs;
