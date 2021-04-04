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

  let hourText = (hours / 60) + (hours > 60 ? " hours" : " hour");

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
      <View style={{ backgroundColor: "#13294B", padding: 10 }}>
        <Text
          style={{ paddingHorizontal: 5, textAlign: "center", color: "white", fontSize: 16 }}
        >
          These settings determine the alogrithm used for your daily scheduler. 
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
              thumbTintColor="teal"
              thumbTouchSize={{ width: 25, height: 25 }}
              minimumTrackTintColor="teal"
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
              thumbTintColor="teal"
              thumbTouchSize={{ width: 25, height: 25 }}
              minimumTrackTintColor="teal"
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
              thumbTintColor="teal"
              thumbTouchSize={{ width: 25, height: 25 }}
              minimumTrackTintColor="teal"
              animateTransitions
            />
          </Card>
          <Card>
            <Card.Title>Include a fun task each day if possible?</Card.Title>
            <Switch
              style={{ alignSelf: "center" }}
              trackColor={{ false: "#767577", true: "#8BD3E6" }}
              thumbColor={includeFun ? "teal" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIncludeFun(!includeFun)}
              value={includeFun}
            />
          </Card>
          <View style={{ margin: 5, padding: 10 }}>
            <Button
              title="SAVE SCHEDULING SETTINGS"
              raised
              titleStyle={{color: "#13294B"}}
              buttonStyle={{ 
                backgroundColor: "#8BD3E6", 
                height: 60 }}
              onPress={savePreferences}
              accessibilityLabel="Tap to save scheduling settings"
            />
            <Button
              containerStyle={{ marginTop: 10 }}
              raised
              titleStyle={{color: "white"}}
              buttonStyle={{ 
                backgroundColor: "#e84a5f", 
                height: 60,
                }}
              title="RESET SCHEDULING DEFAULTS"
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
