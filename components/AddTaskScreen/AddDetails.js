import React, { useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-elements";

import {
  DurationInput,
  DifficultyInput,
  InterestInput,
  PriorityInput,
} from "../shared";
import * as Animatable from "react-native-animatable";

// called inside modal in AddTaskPage
// gets task object with task, due, and category properties
// updates task with details input, passes back to parent
const AddDetails = ({ taskBasics, createTask, defaultTask }) => {
  // hooks for detail inputs
  const [priority, setPriority] = useState(defaultTask.priority);
  const [difficulty, setDifficulty] = useState(defaultTask.difficulty);
  const [interest, setInterest] = useState(defaultTask.interest);
  const [duration, setDuration] = useState(defaultTask.duration);

  // reset local state
  const resetDetails = () => {
    setPriority(defaultTask.priority);
    setDifficulty(defaultTask.difficulty);
    setInterest(defaultTask.interest);
    setDuration(defaultTask.duration);
  };

  // combine detail input with existing basic task
  // pass task back to parent through createTask
  const saveDetails = () => {
    const newTask = {
      ...taskBasics,
      priority: priority,
      difficulty: difficulty,
      interest: interest,
      duration: duration,
    };
    createTask(newTask);
    resetDetails();
  };

  return (
    <>
      <Animatable.View
        animation="slideInDown"
        duration={1300}
        style={{
          padding: 15,
          backgroundColor: "teal",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          {taskBasics.task}
        </Text>
      </Animatable.View>
      <ScrollView style={{ flex: 1 }}>
        <Animatable.View animation="zoomIn" duration={1300}>
          <PriorityInput priority={priority} setPriority={setPriority} />
        </Animatable.View>
        <Animatable.View animation="zoomIn" duration={1300}>
          <InterestInput interest={interest} setInterest={setInterest} />
        </Animatable.View>
        <Animatable.View animation="zoomIn" duration={1300}>
          <DifficultyInput
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </Animatable.View>
        <Animatable.View animation="zoomIn" duration={1300}>
          <DurationInput duration={duration} setDuration={setDuration} />
        </Animatable.View>
        <Button
          title="ADD TASK"
          onPress={saveDetails}
          accessibilityLabel="Tap to save task details"
          containerStyle={{ padding: 15 }}
          raised
          titleStyle={{color: "#13294B"}}
            buttonStyle={{ 
              backgroundColor: "#8BD3E6", 
              height: 60
              }}
        />
      </ScrollView>
    </>
  );
};

export default AddDetails;
