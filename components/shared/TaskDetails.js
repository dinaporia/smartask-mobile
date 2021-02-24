import React from "react";
import { Text } from "react-native";
import { Card, Slider } from "react-native-elements";

import Rating from "./Rating/TapRating";

const PriorityInput = ({ priority, setPriority }) => {
  return (
    <Card>
      <Card.Title>Priority</Card.Title>
      <Card.Divider />

      <Rating
        count={3}
        reviews={["WANT", "SHOULD", "MUST"]}
        reviewSize={14}
        defaultRating={priority}
        size={30}
        selectedColor="teal"
        reviewColor="teal"
        onFinishRating={(rating) => setPriority(rating)}
      />
    </Card>
  );
};

const DifficultyInput = ({ difficulty, setDifficulty }) => {
  return (
    <Card>
      <Card.Title>Difficulty</Card.Title>
      <Card.Divider />

      <Rating
        count={4}
        reviews={["EASY", "DOABLE", "CHALLENGING", "HARD"]}
        reviewSize={14}
        defaultRating={difficulty}
        size={30}
        selectedColor="teal"
        reviewColor="teal"
        onFinishRating={(rating) => setDifficulty(rating)}
      />
    </Card>
  );
};

const InterestInput = ({ interest, setInterest }) => {
  return (
    <Card>
      <Card.Title>Interest</Card.Title>
      <Card.Divider />
      <Rating
        count={3}
        reviews={["TEDIOUS", "MEH", "FUN"]}
        reviewSize={14}
        defaultRating={interest}
        size={30}
        selectedColor="teal"
        reviewColor="teal"
        onFinishRating={(rating) => setInterest(rating)}
      />
    </Card>
  );
};

const DurationInput = ({ duration, setDuration }) => {
  // customize text displayed depending on length
  const getDurationText = (duration) => {
    if (duration < 60) {
      return duration + " minutes";
    }
    if (duration === 60) {
      return "1 hour";
    }
    const hours = (duration / 60).toFixed(0);
    const minutes = duration % 60;
    if (hours > 0) {
      if (minutes > 0) {
        return `${hours} hours and ${minutes} minutes`;
      }
      return `${hours} hours`;
    }
    return `${minutes} minutes`;
  };

  const durationText = getDurationText(duration);

  return (
    <Card>
      <Card.Title>Duration</Card.Title>
      <Card.Divider />
      {duration && <Text style={{ textAlign: "center" }}>{durationText}</Text>}
      <Slider
        value={duration}
        onValueChange={(value) => setDuration(value)}
        minimumValue={15}
        maximumValue={180}
        step={15}
        thumbTintColor="#e84a5f"
        thumbTouchSize={{ width: 25, height: 25 }}
        minimumTrackTintColor="#e84a5f"
        animateTransitions
      />
    </Card>
  );
};

export { DurationInput, DifficultyInput, InterestInput, PriorityInput };
