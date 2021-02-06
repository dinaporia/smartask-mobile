import React, { useState } from 'react';
import { Text, View, ScrollView, Modal } from 'react-native';
import { connect } from 'react-redux';
import { toggleCompleted } from '../redux/tasksSlice';
import Filter from './Filter';
import SortTaskList from './SortTaskList';
import Footer from './Footer';
import SortMenu from './SortMenu';
import EditDetails from './EditDetails';

const mapState = state => {
   return {
      tasks: state.tasks
   }
};



const ListPage = ({tasks, toggleCompleted, navigation}) => {

   // hook for modal
   const [showModal, setShowModal] = useState(false);
   
   const [priorityFilter, setPriorityFilter] = useState(0);
   const [interestFilter, setInterestFilter] = useState(0);
   const [difficultyFilter, setDifficultyFilter] = useState(0);
   const [completedFilter, setCompletedFilter] = useState(false);

   // hook for setting sort order
   const [sortBy, setSortBy] = useState(null);

   // reset all filters
   const clearFilters = () => {
      setPriorityFilter(0);
      setInterestFilter(0);
      setDifficultyFilter(0);
      setCompletedFilter(false);   
   };

   const toggle = (id) => {
      console.log("toggle completed");
      console.log("props are " + JSON.stringify(props.tasks));
      toggleCompleted(id);
   }


   const task = [{
      id: '2021-01-12-1',
      task: "Create a to-do list",
      due: "2021-07-25",
      duration: 30,
      category: "Home",
      priority: 1,
      difficulty: 1,
      interest: 1,
      recurring: false,
      completed: true
  }];
   // let filteredTasks = props.tasks;
   // // if filter value is truthy, update filteredTasks based on filter type
   // if (completedFilter) {
   //    filteredTasks = filteredTasks.filter(task => !task.completed);
   //    }
   // if (priorityFilter) {
   //    filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
   //    }
   // if (interestFilter) {
   //    filteredTasks = filteredTasks.filter(task => task.duration === interestFilter);
   //    }
   // if (difficultyFilter) {
   //     filteredTasks = filteredTasks.filter(task => task.difficulty === difficultyFilter);
   //    }
 
   // update sortBy state, called via SortMenu button click
   const sortTasks = (sorting) => {
      if (sorting) {
         setSortBy(sorting);
      } else {
      setSortBy(null);
      }
   }
   const [taskId, setTaskId] = useState(null)

   const selectTask = (id) => {
      setTaskId(id);
      console.log("taskId " + taskId);
      setShowModal(true);
   }

   return (
       <ScrollView>
         {/* sorting toolbar, receives access to setSortBy method */}
         <SortMenu sortTasks={sortTasks}/>
         {/* filter toolbar, receives access to filters and their methods */}
         {/* <Filter priorityFilter={priorityFilter} interestFilter={interestFilter} difficultyFilter={difficultyFilter} completedFilter={completedFilter} setDifficultyFilter={setDifficultyFilter} setInterestFilter={setInterestFilter} setPriorityFilter={setPriorityFilter} setCompletedFilter={setCompletedFilter} clearFilters={clearFilters}/> */}
         {/* sorting Component receives filtered tasks and task methods, sorts, then passes all to RenderTaskList */}
         <SortTaskList tasks={tasks} sortBy={sortBy} navigation={navigation} selectTask={selectTask}/>
         {/* footer maintains counter of completed and remaining tasks, gets access to removeCompleted method */}
         {/* <Footer removeCompleted={removeTask} tasks={filteredTasks}/> */}
         <Modal 
            animationType={'slide'}
            transparent={false}
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
            >
            <EditDetails setShowModal={setShowModal} taskId={taskId}/>
         </Modal>
       </ScrollView>
   );
}

export default connect(mapState)(ListPage);