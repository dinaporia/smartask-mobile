import React from 'react';
import { Text } from 'react-native';
import { AirbnbRating, Card, Slider } from 'react-native-elements';


const PriorityInput = ({priority, setPriority}) => {
    return (
        <Card>
            <Card.Title>Priority</Card.Title>
            <Card.Divider />
 
            <AirbnbRating 
                count={3}
                reviews={["WANT", "SHOULD", "MUST"]}
                defaultRating={priority}
                size={30}
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
        
            <AirbnbRating 
                count={4}
                reviews={["EASY", "DOABLE", "CHALLENGING", "HARD"]}
                defaultRating={difficulty}
                size={30}
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
            <AirbnbRating 
                count={3}
                reviews={["FUN", "MEH", "TEDIOUS"]}
                defaultRating={interest}
                size={30}
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