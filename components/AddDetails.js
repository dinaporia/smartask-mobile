import React, { useState } from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import {DurationInput, DifficultyInput, InterestInput, PriorityInput} from './TaskDetails';

// called inside modal in AddTaskPage
// gets task basics
// returns details to reducer passed as prop
   const AddDetails = (props) => {

      const {taskBasics, addDetailed} = props;

      const [priority, setPriority] = useState(2);
      const [difficulty, setDifficulty] = useState(2);
      const [interest, setInterest] = useState(2);
      const [duration, setDuration] = useState(90);

      let durationText = (duration/60).toFixed(1) + " hours";

      const resetDetails = () => {
         setPriority(2);
         setDifficulty(2);
         setInterest(2);
         setDuration(90);
      }
      // generate new task object from details, pass back to parent through addDetailed
      const saveDetails = () => {
         const newTask = {...taskBasics, priority: priority, difficulty: difficulty, interest: interest, duration: duration};
         addDetailed(newTask);
         resetDetails();
      };

    return (

      <ScrollView>
         <Text>task</Text>
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
    )
    
   
}
export default AddDetails;