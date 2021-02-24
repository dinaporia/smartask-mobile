import React, { useState } from "react";
import { Text, View, Alert, Switch, StyleSheet } from "react-native";
import { Button, Slider, Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import {
  editPrefs,
  resetPrefs,
  defaultPrefs,
} from "../../redux/schedulePrefsSlice";
import * as Animatable from "react-native-animatable";

// determines settings for generating daily schedule
const SchedulePrefs = () => {
  const dispatch = useDispatch();
  const prefs = useSelector((state) => state.schedulePrefs);

  const [hours, setHours] = useState(prefs.hours);
  const [maxHard, setMaxHard] = useState(prefs.maxHard);
  const [maxTedious, setMaxTedious] = useState(prefs.maxTedious);
  const [includeFun, setIncludeFun] = useState(prefs.includeFun);

  let hourText = (hours / 60).toFixed(0) + (hours > 60 ? " hours" : " hour");

  // send new preferences object to store
  const savePreferences = () => {
    const newPrefs = {
      hours: hours,
      maxHard: maxHard,
      maxTedious: maxTedious,
      includeFun: includeFun,
    };
    dispatch(editPrefs(newPrefs));
    return Alert.alert("Your preferences have been updated.");
  };

  // reset store and local prefs to default
  const resetSchedPrefs = () => {
    dispatch(resetPrefs());
    setHours(defaultPrefs.hours);
    setMaxTedious(defaultPrefs.maxTedious);
    setMaxHard(defaultPrefs.maxHard);
    setIncludeFun(defaultPrefs.includeFun);
  };

  return (
    <>
      <View style={{ backgroundColor: "#e84a5f", padding: 10 }}>
        <Text style={styles.subTitle}>Schedule Settings</Text>
        <Text
          style={{ paddingHorizontal: 3, textAlign: "center", color: "white" }}
        >
          Specify the settings to use when scheduling your daily tasks.
        </Text>
      </View>
      <ScrollView>
        <Animatable.View
          animation="zoomIn"
          duration={1300}
          style={{ flex: 1, margin: 10, padding: 10, backgroundColor: "white" }}
        >
          <Card>
            <Card.Title>
              How many total hours would you like to work on tasks each day?
            </Card.Title>
            <Text style={{ textAlign: "center" }}>{hourText}</Text>
            <Slider
              value={hours}
              onValueChange={(value) => setHours(value)}
              minimumValue={60}
              maximumValue={480}
              step={60}
              thumbTintColor="#e84a5f"
              thumbTouchSize={{ width: 25, height: 25 }}
              minimumTrackTintColor="#e84a5f"
              animateTransitions
            />
          </Card>
          <Card>
            <Card.Title>
              Maximum difficult tasks to work on each day?
            </Card.Title>
            <Text style={{ textAlign: "center" }}>{maxHard}</Text>
            <Slider
              value={maxHard}
              onValueChange={(value) => setMaxHard(value)}
              minimumValue={1}
              maximumValue={10}
              step={1}
              thumbTintColor="#e84a5f"
              thumbTouchSize={{ width: 25, height: 25 }}
              minimumTrackTintColor="#e84a5f"
              animateTransitions
            />
          </Card>
          <Card>
            <Card.Title>Maximum boring tasks to work on each day?</Card.Title>
            <Text style={{ textAlign: "center" }}>{maxTedious}</Text>
            <Slider
              value={maxTedious}
              onValueChange={(value) => setMaxTedious(value)}
              minimumValue={1}
              maximumValue={10}
              step={1}
              thumbTintColor="#e84a5f"
              thumbTouchSize={{ width: 25, height: 25 }}
              minimumTrackTintColor="#e84a5f"
              animateTransitions
            />
          </Card>
          <Card>
            <Card.Title>Include a fun task each day if possible?</Card.Title>
            <Switch
              style={{ alignSelf: "center" }}
              trackColor={{ false: "#767577", true: "#e84a5f" }}
              thumbColor={includeFun ? "#e84a5f" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIncludeFun(!includeFun)}
              value={includeFun}
            />
          </Card>
          <View style={{ margin: 5, padding: 10 }}>
            <Button
              title="SAVE SETTINGS"
              buttonStyle={{ backgroundColor: "#e84a5f" }}
              onPress={savePreferences}
              accessibilityLabel="Tap to save scheduling settings"
            />
            <Button
              containerStyle={{ marginTop: 10 }}
              buttonStyle={{ backgroundColor: "#155263" }}
              title="RESET SETTINGS"
              onPress={resetSchedPrefs}
              accessibilityLabel="Tap to reset scheduling settings"
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

export default SchedulePrefs;
