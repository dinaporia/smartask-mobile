import React, { useState } from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';

import { DurationInput, DifficultyInput, InterestInput, PriorityInput } from '../shared';

// called inside modal in AddTaskPage
// gets task object with task, due, and category properties
// updates task with details input, passes back to parent
   const AddDetails = ({taskBasics, createTask, defaultTask}) => {
      // hooks for detail inputs
      const [priority, setPriority] = useState(defaultTask.priority);
      const [difficulty, setDifficulty] = useState(defaultTask.difficulty);
      const [interest, setInterest] = useState(defaultTask.interest);
      const [duration, setDuration] = useState(defaultTask.duration);

      // convert duration input into hours for display
      let durationText = (duration/60).toFixed(1) + " hours";

      // reset local state
      const resetDetails = () => {
         setPriority(defaultTask.priority);
         setDifficulty(defaultTask.difficulty);
         setInterest(defaultTask.interest);
         setDuration(defaultTask.duration);
      }

      // combine detail input with existing basic task
      // pass task back to parent through createTask
      const saveDetails = () => {
         const newTask = {...taskBasics, priority: priority, difficulty: difficulty, interest: interest, duration: duration};
         createTask(newTask);
         resetDetails();
      };

    return (
      <ScrollView>
         <Text>{taskBasics.task}</Text>
         <PriorityInput priority={priority} setPriority={setPriority}/>
         <InterestInput interest={interest} setInterest={setInterest}/>
         <DifficultyInput difficulty={difficulty} setDifficulty={setDifficulty}/>
         <DurationInput durationText={durationText} duration={duration} setDuration={setDuration} />
         <Button 
         title="ADD TASK"
         onPress={saveDetails}
         accessibilityLabel='Tap to save task details'
         />
      </ScrollView> 
    );
}


export default AddDetails;