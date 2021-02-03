import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Filter from './Filter';
import SortTaskList from './SortTaskList';
import Footer from './Footer';
import SortMenu from './SortMenu';




const ListPage = (props) => {
   // hook for setting filter options
   // const [filters, setFilters] = useState({
   //     priorityFilter: 0,
   //     durationFilter: 0,
   //     difficultyFilter: 0,
   //     completedFilter: false
   // });
   const [priorityFilter, setPriorityFilter] = useState(0);
   const [interestFilter, setInterestFilter] = useState(0);
   const [difficultyFilter, setDifficultyFilter] = useState(0);
   const [completedFilter, setCompletedFilter] = useState(false);

   // hook for setting sort order
   const [sortBy, setSortBy] = useState(null);

   // reset all filters
   const clearFilters = () => {
      setPriorityFilter: 0;
      setInterestFilter: 0;
      setDifficultyFilter: 0;
      setCompletedFilter: false;   
   };

   const tasks = [
      {
         id: '2021-01-12-1',
         task: "Create a to-do list",
         due: new Date("2021-07-25"),
         duration: 30,
         category: "Home",
         priority: 1,
         difficulty: 1,
         interest: 1,
         recurring: false,
         completed: true
      },
      {
            id: '2021-01-14-2',
            task: "Test my to-do list",
            due: new Date("2021-06-26"),
            duration: 30,
            category: "Work",
            priority: 1,
            difficulty: 1,
            interest: 2,
            recurring: false,
            completed: false
      },
      {
            id: '2021-01-14-3',
            task: "Implement error checking",
            due: new Date("2022-10-25"),
            duration: 120,
            category: "Other",
            priority: 2,
            difficulty: 2,
            interest: 1,
            recurring: false,
            completed: false
      },
      {
            id: '2021-01-14-4',
            task: "Fetch tasks from server",
            due: new Date("2021-03-25"),
            duration: 120,
            category: "Work",
            priority: 2,
            difficulty: 1,
            interest: 3,
            recurring: false,
            completed: false
      },
      {
            id: '2021-01-14-5',
            task: "Scheduling algorithm",
            due: new Date("2021-06-25"),
            duration: 180,
            category: "Work",
            priority: 3,
            difficulty: 3,
            interest: 3,
            recurring: false,
            completed: false
      },
      {
            id: '2021-01-14-6',
            task: "Preferences input page",
            due: new Date("2021-09-05"),
            duration: 30,
            category: "Work",
            priority: 3,
            difficulty: 2,
            interest: 1,
            recurring: false,
            completed: false
      },
      {
            id: '2021-01-14-7',
            task: "Split tasks into subtasks",
            due: new Date("2021-07-05"),
            duration: 60,
            category: "Work",
            priority: 2,
            difficulty: 4,
            interest: 1,
            recurring: false,
            completed: false
      },
     ];

   const toggleCompleted = () => {
      console.log("toggle completed");
   }
   const removeTask = () => {
      console.log("remove task");
   }
   // passed as props to TaskList
   const editDetails = (task) => {
       // dispatch storeTask with selected task
   //   props.storeTask(task);
       // redirect to edit task page
      console.log("edit details")
      props.navigation.navigate('Edit');
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
      filteredTasks = filteredTasks.filter(task => task.duration === interestFilter);
      }
   if (difficultyFilter) {
       filteredTasks = filteredTasks.filter(task => task.difficulty === difficultyFilter);
      }
 
   // update sortBy state, called via SortMenu button click
   const sortTasks = (sorting) => {
      if (sorting) {
         setSortBy(sorting);
      } else {
      setSortBy(null);
      }
   }

   return (
       <ScrollView>
         {/* sorting toolbar, receives access to setSortBy method */}
         <SortMenu sortTasks={sortTasks}/>
         {/* filter toolbar, receives access to filters and their methods */}
         <Filter priorityFilter={priorityFilter} interestFilter={interestFilter} difficultyFilter={difficultyFilter} completedFilter={completedFilter} setDifficultyFilter={setDifficultyFilter} setInterestFilter={setInterestFilter} setPriorityFilter={setPriorityFilter} setCompletedFilter={setCompletedFilter} clearFilters={clearFilters}/>
         {/* sorting Component receives filtered tasks and task methods, sorts, then passes all to RenderTaskList */}
         <SortTaskList tasks={filteredTasks} sortBy={sortBy} toggleCompleted={toggleCompleted} editDetails={editDetails} removeTask={removeTask}/>
         {/* footer maintains counter of completed and remaining tasks, gets access to removeCompleted method */}
         <Footer removeCompleted={removeTask} tasks={filteredTasks}/>
       </ScrollView>
   );
}

export default ListPage;