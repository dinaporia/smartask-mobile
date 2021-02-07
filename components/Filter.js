import React, { useState } from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import { Rating, Button, Icon } from 'react-native-elements';


const Filter = ({priorityFilter, interestFilter, difficultyFilter, completedFilter, setDifficultyFilter, setInterestFilter, setPriorityFilter, setCompletedFilter, clearFilters}) => {
    // hooks allow toggling filter menu
    const [priorityOpen, setPriorityOpen] =  useState(false);
    const [difficultyOpen, setDifficultyOpen] = useState(false);
    const [interestOpen, setInterestOpen] =  useState(false);
   
    // toggle filter collapse menu
    const toggle = (filter) => {
        switch (filter) {
            case "priority": 
                if (priorityOpen) {
                    return setPriorityOpen(false);
                }
                setDifficultyOpen(false);
                setInterestOpen(false);
                setPriorityOpen(true);
                break;  
            case "difficulty":  
                if (difficultyOpen) {
                    return setDifficultyOpen(false);
                }
                setDifficultyOpen(true);
                setInterestOpen(false);
                setPriorityOpen(false);
                break;  
            case "interest": 
                if (interestOpen) {
                    return setInterestOpen(false);
                }
                setDifficultyOpen(false);
                setInterestOpen(true);
                setPriorityOpen(false);
                break;
            default:
                setPriorityOpen(false);
                setDifficultyOpen(false);
                setInterestOpen(false);
        }
    }

    // call clearFilter and close filter menus
    const clearAll = () => {
        clearFilters();
        setPriorityOpen(false);
        setDifficultyOpen(false);
        setInterestOpen(false);  
    }

    return (
        <View>
            <View style={styles.container}>
                <Icon style={{marginHorizontal: 3}}    
                    size={12}
                    name='filter'
                    type='font-awesome'
                />
                <Button
                containerStyle={styles.filterItem}
                onPress={() => toggle('priority')}
                titleStyle={styles.filterText}
                title="Priority"
                type="outline"
                raised={(priorityOpen) ? true : false}
                />
                <Button
                raised={(difficultyOpen) ? true : false}
                containerStyle={styles.filterItem}
                onPress={() => toggle('difficulty')}
                titleStyle={styles.filterText}
                title="Difficulty"
                type="outline"   
                    
                />
                <Button
                raised={(interestOpen) ? true : false}
                containerStyle={styles.filterItem}
                onPress={() => toggle('interest')}
                titleStyle={styles.filterText}
                title="Interest"
                type="outline" 
                />
                <Button
                containerStyle={styles.filterItem}
                raised={(completedFilter) ? true : false}
                onPress={() => setCompletedFilter(!completedFilter)}
                titleStyle={styles.filterText}
                title="Completed"
                type="outline"    
                />
                <Icon 
                    style={{marginHorizontal: 5}}    
                    size={10}
                    name='remove'
                    color='gray'
                    type='font-awesome'
                    onPress={()=> clearAll()}
                    containerStyle={{alignContent: 'flex-end', marginRight: 5}}
                />
            </View>
    {/* priority toggle menu */}
        {priorityOpen && 
        <View style={styles.container}>
            <Button 
                title="MUST"
                titleStyle={styles.filterText}
                type="outline" 
                raised={(priorityFilter === 3) ? true : false}
                onPress={() => setPriorityFilter(3)}
            />
            <Button 
                title="SHOULD"
                titleStyle={styles.filterText}
                type="outline" 
                raised={(priorityFilter === 2) ? true : false}
                onPress={() => setPriorityFilter(2)}
            />
            <Button 
                title="WANT"
                titleStyle={styles.filterText}
                type="outline" 
                raised={(priorityFilter === 1) ? true : false}
                onPress={() => setPriorityFilter(1)}
            />
            <Button 
                title="ALL"
                titleStyle={styles.filterText}
                type="outline" 
                raised={(priorityFilter === 0) ? true : false}
                onPress={() => setPriorityFilter(0)}
            />
        </View>
    }           
    {/* difficulty toggle menu */}
        {difficultyOpen && 
        <View style={styles.container}>
            <Button 
                title="EASY"
                titleStyle={styles.filterText}
                type="outline" 
                raised={(difficultyFilter === 1) ? true : false}
                onPress={() => setDifficultyFilter(1)}
            />
            <Button 
                title="DOABLE"
                titleStyle={styles.filterText}
                type="outline" 
                raised={(difficultyFilter === 2) ? true : false}
                onPress={() => setDifficultyFilter(2)}
            />
            <Button 
                title="CHALLENGING"
                titleStyle={styles.filterText}
                type="outline" 
                raised={(difficultyFilter === 3) ? true : false}
                onPress={() => setDifficultyFilter(3)}
            />
            <Button 
                title="HARD"
                titleStyle={styles.filterText}
                type="outline" 
                raised={(difficultyFilter === 4) ? true : false}
                onPress={() => setDifficultyFilter(4)}
            />
            <Button 
                title="ALL"
                titleStyle={styles.filterText}
                type="outline" 
                raised={(difficultyFilter === 0) ? true : false}
                onPress={() => setDifficultyFilter(0)}
            />
        </View>
        }             
    {/* interest toggle menu */}
        {interestOpen && 
        <View style={styles.container}>
            <Button 
                title="FUN"
                titleStyle={styles.filterText}
                type="outline" 
                raised={(interestFilter === 1) ? true : false}
                onPress={() => setInterestFilter(1)}
            />
            <Button 
                title="MEH"
                titleStyle={styles.filterText}
                type="outline" 
                raised={(interestFilter === 2) ? true : false}
                onPress={() => setInterestFilter(2)}
            />
            <Button 
                title="TEDIOUS"
                titleStyle={styles.filterText}
                type="outline" 
                raised={(interestFilter === 3) ? true : false}
                onPress={() => setInterestFilter(3)}
            />
            <Button 
                title="ALL"
                titleStyle={styles.filterText}
                type="outline" 
                raised={(interestFilter === 0) ? true : false}
                onPress={() => setInterestFilter(0)}
            />
        </View>
        }                         
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 3,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
        
    },
    filterItem: {
        flex: 1,
        borderStyle: 'dotted',
        
    },
    filterText: {
        fontSize: 10,
        color: 'gray',
    }
    
  });

export default Filter;

