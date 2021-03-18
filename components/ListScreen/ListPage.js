import React, { useState } from "react";
import { View, ScrollView, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import Filter from "./Filter";
import SortMenu from "./SortMenu";
import EditDetails from "./EditDetails";
import { RenderTaskList, Footer } from "../shared";
import * as Animatable from "react-native-animatable";

const ListPage = () => {
  // retrieve tasks from store
  const tasks = useSelector((state) => state.tasks);

  // filter settings
  const [priorityFilter, setPriorityFilter] = useState(0);
  const [interestFilter, setInterestFilter] = useState(0);
  const [difficultyFilter, setDifficultyFilter] = useState(0);
  const [completedFilter, setCompletedFilter] = useState(false);
  // set via sortTasks functions, passed to RenderTaskList
  const [sortBy, setSortBy] = useState(null);
  // toggle modal containing EditDetails
  const [showModal, setShowModal] = useState(false);
  // set by selectTask, passed to EditDetails
  const [taskId, setTaskId] = useState(null);

  // called by RenderTaskList
  const selectTask = (id) => {
    setTaskId(id);
    setShowModal(true);
  };

  // called via SortMenu
  const sortTasks = (sorting) =>
    sorting ? setSortBy(sorting) : setSortBy(null);

  // reset all filters
  const clearFilters = () => {
    setPriorityFilter(0);
    setInterestFilter(0);
    setDifficultyFilter(0);
    setCompletedFilter(false);
  };

  let filteredTasks = tasks;
  // if filter value is truthy, update filteredTasks based on filter type
  if (completedFilter) {
    filteredTasks = filteredTasks.filter((task) => !task.completed);
  }
  if (priorityFilter) {
    filteredTasks = filteredTasks.filter(
      (task) => task.priority === priorityFilter
    );
  }
  if (interestFilter) {
    filteredTasks = filteredTasks.filter(
      (task) => task.interest === interestFilter
    );
  }
  if (difficultyFilter) {
    filteredTasks = filteredTasks.filter(
      (task) => task.difficulty === difficultyFilter
    );
  }

  return (
    <View style={{ flex: 1, paddingVertical: 10 }}>
   {/* <View style={{height: 75, justifyContent: 'space-evenly' }}> */}

 
        {/* sorting toolbar, receives access to setSortBy hook */}
        <SortMenu sortTasks={sortTasks} />
        {/* filter toolbar, receives access to filters and their methods */}
        <Filter
          priorityFilter={priorityFilter}
          interestFilter={interestFilter}
          difficultyFilter={difficultyFilter}
          completedFilter={completedFilter}
          setDifficultyFilter={setDifficultyFilter}
          setInterestFilter={setInterestFilter}
          setPriorityFilter={setPriorityFilter}
          setCompletedFilter={setCompletedFilter}
          clearFilters={clearFilters}
        />
  {/* </View> */}


      {/* <Animatable.View animation="zoomIn" duration={1300} style={{zIndex: 0, paddingBottom:80}}> */}
        <RenderTaskList
          tasks={filteredTasks}
          sortBy={sortBy}
          selectTask={selectTask}
          canDelete
          canEdit
        />
      {/* </Animatable.View> */}

      <View
        style={{
          justifyContent: "flex-end",
          flex: 1,
          position: 'absolute',
          bottom: 20,
          width: '100%',
          zIndex: 1
        }}
      >
        <Footer tasks={filteredTasks} />
      </View>

      <Modal
        animationType={"slide"}
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <EditDetails setShowModal={setShowModal} taskId={taskId} />
      </Modal>
    </View>
  );
};

export default ListPage;
