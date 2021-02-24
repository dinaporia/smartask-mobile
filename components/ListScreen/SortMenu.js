import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Button } from "react-native-elements";
import * as Animatable from "react-native-animatable";

// sort order toolbar, gets access to local sortBy state in ListPage
const SortMenu = ({ sortTasks }) => {
  return (
    <Animatable.View animation="slideInLeft" style={styles.container}>
      <Icon
        size={16}
        name="sort"
        type="font-awesome"
        iconStyle={{ color: "#e84a5f", marginLeft: 9 }}
      />
      <Button
        containerStyle={styles.sortItem}
        onPress={() => sortTasks()}
        titleStyle={{ fontSize: 12, color: "white" }}
        title="Added"
        type="clear"
        buttonStyle={{
          backgroundColor: "#e84a5f",
          margin: 8,
          opacity: 0.9,
        }}
      />
      <Button
        containerStyle={styles.sortItem}
        onPress={() => sortTasks("alphabet")}
        titleStyle={{ fontSize: 12, color: "white" }}
        title="A-Z"
        type="clear"
        buttonStyle={{
          backgroundColor: "#e84a5f",
          margin: 8,
          opacity: 0.9,
        }}
      />
      <Button
        containerStyle={styles.sortItem}
        onPress={() => sortTasks("due")}
        titleStyle={{ fontSize: 12, color: "white" }}
        title="due"
        type="clear"
        buttonStyle={{
          backgroundColor: "#e84a5f",
          margin: 8,
          opacity: 0.9,
        }}
      />
      <Button
        containerStyle={styles.sortItem}
        onPress={() => sortTasks("priority")}
        titleStyle={{ fontSize: 12, color: "white" }}
        title="Priority"
        type="clear"
        buttonStyle={{
          backgroundColor: "#e84a5f",
          margin: 8,
          opacity: 0.9,
        }}
      />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  sortItem: {
    flex: 1,
  },
  sortText: {
    textAlign: "center",
    fontSize: 12,
  },
});

export default SortMenu;
