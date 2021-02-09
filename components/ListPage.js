import React, { useState } from 'react';
import { Text, View, ScrollView, Modal } from 'react-native';
import { connect, useSelector } from 'react-redux';
import Filter from './Filter';
import RenderTaskList from './RenderTaskList';
import Footer from './Footer';
import SortMenu from './SortMenu';
import EditDetails from './EditDetails';
import HeaderBackButton from '@react-navigation/stack';

const ListPage = (props) => {
   // retrieve tasks from store
   const tasks = useSelector(state => state.tasks);

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
   const [taskId, setTaskId] = useState(null)

   // called by RenderTaskList
   const selectTask = (id) => {
      setTaskId(id);
      setShowModal(true);
   }

   // called via SortMenu
   const sortTasks = (sorting) => (sorting) ? setSortBy(sorting) : setSortBy(null);
   
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
      filteredTasks = filteredTasks.filter(task => !task.completed);
      }
   if (priorityFilter) {
      filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
      }
   if (interestFilter) {
      filteredTasks = filteredTasks.filter(task => task.interest === interestFilter);
      }
   if (difficultyFilter) {
       filteredTasks = filteredTasks.filter(task => task.difficulty === difficultyFilter);
      }
 
   return (
      <View style={{flex: 1}}>
         <View style={{height: 80}}>
            {/* sorting toolbar, receives access to setSortBy hook */}
            <SortMenu sortTasks={sortTasks}/>
               {/* filter toolbar, receives access to filters and their methods */}
            <Filter priorityFilter={priorityFilter} interestFilter={interestFilter} difficultyFilter={difficultyFilter} completedFilter={completedFilter} setDifficultyFilter={setDifficultyFilter} setInterestFilter={setInterestFilter} setPriorityFilter={setPriorityFilter} setCompletedFilter={setCompletedFilter} clearFilters={clearFilters}/>
         </View>
      <RenderTaskList tasks={filteredTasks} sortBy={sortBy} selectTask={selectTask} forPage="list" />
      <ScrollView >
         <Footer tasks={filteredTasks}/>
      </ScrollView>
      
      <Modal 
         animationType={'slide'}
         transparent={false}
         visible={showModal}
         onRequestClose={() => setShowModal(false)}
         >
         <EditDetails setShowModal={setShowModal} taskId={taskId}/>
      </Modal>
       </View>
   );
}

// override back button to return to home
ListPage.navigationOptions = ({navigation}) => {
   return { 
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Home')} /> 
   }
}

export default connect()(ListPage);