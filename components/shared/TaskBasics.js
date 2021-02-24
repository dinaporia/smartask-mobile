import React, { Component, useState } from "react";
import { Text, View, TextInput, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-community/picker";
import { parseISO } from "date-fns";

// components render input fields and pass input back to parent
// rendered by AddTaskPage and EditDetails
const TaskNameInput = ({ task, onTextChange }) => {
  // increase number of rows for task name onFocus
  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => {
    setIsFocus(true);
  };
  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <TextInput
        style={{
          height: isFocus ? 80 : 40,
          borderColor: "#2a363b",
          borderWidth: 0,
          borderBottomWidth: 1,
          paddingLeft: 5,
          textAlign: "center",
          backgroundColor: "#ff847c",
        }}
        // disable autofill
        textContentType="none"
        placeholder={task ? task : "Enter task here"}
        onChangeText={(text) => onTextChange(text)}
        value={task}
        onFocus={handleFocus}
      />
    </View>
  );
};

const TaskCategoryInput = ({ category, onSelect, showLabel = false }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {showLabel && (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ textAlignVertical: "center", borderRadius: 16 }}>
            Category:
          </Text>
        </View>
      )}
      <View style={{ flex: 2 }}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => onSelect(itemValue)}
          style={{ backgroundColor: "#ff847c" }}
        >
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Home" value="Home" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
    </View>
  );
};

class TaskDateInput extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }
  handleDateInput = (date) => {
    if (date) {
      this.setState({ show: false });
      const stringDate = date.toISOString();
      this.props.onDateChange(stringDate);
    }
  };

  render() {
    const today = new Date();
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ textAlignVertical: "center", borderRadius: 16 }}>
              Due date:
            </Text>
          </View>
          <View style={{ flex: 2 }}>
            <Button
              // on press, set show to true
              onPress={() => this.setState({ show: !this.state.show })}
              title={
                this.props.date
                  ? parseISO(this.props.date).toLocaleDateString("en-US")
                  : today.toLocaleDateString("en-US")
              }
              accessibilityLabel="Tap to select due date"
              buttonStyle={{ backgroundColor: "#ff847c" }}
              titleStyle={{ color: "black" }}
            />
          </View>
        </View>
        {/* if show is set to true, show calendar */}
        {this.state.show && (
          <DateTimePicker
            value={this.props.date ? parseISO(this.props.date) : today}
            mode={"date"}
            display="default"
            onChange={(event, selectedDate) =>
              this.handleDateInput(selectedDate)
            }
            minimumDate={today}
          />
        )}
      </ScrollView>
    );
  }
}

export { TaskNameInput, TaskCategoryInput, TaskDateInput };
