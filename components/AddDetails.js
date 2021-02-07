import React, { useState } from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import {DurationInput, DifficultyInput, InterestInput, PriorityInput} from './TaskDetails';

// called inside modal in AddTaskPage
// gets task object with task, due, and category properties
// updates task with details input, passes back to parent
   const AddDetails = ({taskBasics, createTask}) => {
      // hooks for detail inputs
      const [priority, setPriority] = useState(2);
      const [difficulty, setDifficulty] = useState(2);
      const [interest, setInterest] = useState(2);
      const [duration, setDuration] = useState(90);

      // convert duration input into hours for display
      let durationText = (duration/60).toFixed(1) + " hours";

      // reset local state
      const resetDetails = () => {
         setPriority(2);
         setDifficulty(2);
         setInterest(2);
         setDuration(90);
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