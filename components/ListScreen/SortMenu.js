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
        iconStyle={{ color: "teal", marginRight: 5, marginLeft: 10}}

      />
      <Button
        containerStyle={styles.sortItem}
        onPress={() => sortTasks()}
        titleStyle={{ fontSize: 12, color: "white" }}
        title="Added"
        type="clear"
        buttonStyle={{
          backgroundColor: "teal",
          marginHorizontal: 5,
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
          backgroundColor: "teal",
          marginHorizontal: 5,
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
          backgroundColor: "teal",
          marginHorizontal: 5,
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
          backgroundColor: "teal",
          marginHorizontal: 5,
          opacity: 0.9,
        }}
      />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
