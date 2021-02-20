import React from 'react';
import { Text } from 'react-native';
import { Card, Slider } from 'react-native-elements';

import Rating from './Rating/TapRating';

const PriorityInput = ({priority, setPriority}) => {
    return (
        <Card>
            <Card.Title>Priority</Card.Title>
            <Card.Divider />
 
            <Rating 
                count={3}
                reviews={["WANT", "SHOULD", "MUST"]}
                reviewSize={14}
                defaultRating={priority}
                size={30}
                selectedColor='teal'
                reviewColor='teal'
                onFinishRating={(rating) => setPriority(rating)}
            />
         </Card>
    )
}

const DifficultyInput = ({difficulty, setDifficulty}) => {
    return (
        <Card>
            <Card.Title>Difficulty</Card.Title>
            <Card.Divider />
        
            <Rating 
                count={4}
                reviews={["EASY", "DOABLE", "CHALLENGING", "HARD"]}
                reviewSize={14}
                defaultRating={difficulty}
                size={30}
                selectedColor='teal'
                reviewColor='teal'
                onFinishRating={(rating) => setDifficulty(rating)}

            />
           
         </Card>
    )
}

const InterestInput = ({interest, setInterest}) => {
    return (
        <Card>
            <Card.Title>Interest</Card.Title>
            <Card.Divider />
            <Rating 
                count={3}
                reviews={["TEDIOUS", "MEH", "FUN"]}
                reviewSize={14}
                defaultRating={interest}
                size={30}
                selectedColor='teal'
                reviewColor='teal'
                onFinishRating={(rating) => setInterest(rating)}

            />
          
         </Card>
    )
}

const DurationInput = ({duration, durationText, setDuration}) => {
    return (
        <Card>
            <Card.Title>Duration</Card.Title>
            <Card.Divider />
            {(duration) && 
            <Text style={{textAlign: 'center'}}>
               {durationText}
            </Text>
            }
            <Slider 
                value={duration}
                onValueChange={value => setDuration(value)}
                minimumValue={30}
                maximumValue={240}
                step={30}
                thumbTintColor='pink'
                thumbTouchSize={{width: 25, height: 25}}
                minimumTrackTintColor='purple'
                animateTransitions
            />
         </Card>
    );
}
         
export {DurationInput, DifficultyInput, InterestInput, PriorityInput}