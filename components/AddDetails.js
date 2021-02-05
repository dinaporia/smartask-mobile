import React, { useState } from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {DurationInput, DifficultyInput, InterestInput, PriorityInput} from './TaskDetails';


   const AddDetails = (props) => {

      const [priority, setPriority] = useState(2);
      const [difficulty, setDifficulty] = useState(2);
      const [interest, setInterest] = useState(2);
      const [duration, setDuration] = useState(90);

      // let priorityText = (priority === 1) ? 'WANT' :
      // (priority === 3) ? 'MUST' : 
      // 'SHOULD';

      // let difficultyText = (difficulty === 1) ? 'EASY' :
      // (difficulty === 3) ? 'CHALLENGING' : 
      // (difficulty === 4) ? 'HARD' :
      // 'DOABLE';

      // let interestText = (interest === 1) ? 'FUN' :
      // (interest === 3) ? 'TEDIOUS' : 
      // 'MEH';

      let durationText = (duration/60).toFixed(1) + " hours";

    return (

      <ScrollView>
         <Text>task</Text>
         <PriorityInput priority={priority} setPriority={setPriority}/>
         <InterestInput interest={interest} setInterest={setInterest}/>
         <DifficultyInput difficulty={difficulty} setDifficulty={setDifficulty}/>
         <DurationInput durationText={durationText} duration={duration} setDuration={setDuration} />
      </ScrollView> 
    )
    
   
}
export default AddDetails;