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
                <Icon   
                    containerStyle={{flex: 1}}
                    size={12}
                    name='filter'
                    type='font-awesome'
                />
                <Button
                containerStyle={[styles.filterItem,
                    (priorityOpen) ? styles.selectedItem : '']
                    }
                
                onPress={() => toggle('priority')}
                titleStyle={styles.filterText}
                title="Priority"
                type="clear"
                
                />
                <Button
                containerStyle={[styles.filterItem,
                    (difficultyOpen) ? styles.selectedItem : '']
                    }
                onPress={() => toggle('difficulty')}
                titleStyle={styles.filterText}
                title="Difficulty"
                type="clear"   
                    
                />
                <Button
                containerStyle={[styles.filterItem,
                    (interestOpen) ? styles.selectedItem : '']
                    }
                onPress={() => toggle('interest')}
                titleStyle={styles.filterText}
                title="Interest"
                type="clear" 
                />
                <Button
                containerStyle={[styles.filterItem,
                    (completedFilter) ? styles.selectedItem : '']
                    }
                onPress={() => {
                    setCompletedFilter(!completedFilter);
                    toggle();
                    }}
                titleStyle={styles.filterText}
                title="Completed"
                type="clear"    
                />
                <Icon 
                    size={10}
                    name='remove'
                    color='gray'
                    type='font-awesome'
                    onPress={()=> clearAll()}
                    containerStyle={{alignContent: 'flex-end', flex: 1.5}}
                />
            </View>
    {/* priority toggle menu */}
        {priorityOpen && 
        <View style={styles.subContainer}>
            <Button 
                title="MUST"
                titleStyle={[styles.filterText,
                    (priorityFilter === 3) ? styles.selectedText : styles.subFilterText]}
                containerStyle={styles.filterSubItem}
                type="clear" 
                onPress={() => setPriorityFilter(3)}
            />
            <Button 
                title="SHOULD"
                titleStyle={[styles.filterText,
                    (priorityFilter === 2) ? styles.selectedText : styles.subFilterText]}
                containerStyle={styles.filterSubItem}
                type="clear" 
                onPress={() => setPriorityFilter(2)}
            />
            <Button 
                title="WANT"
                titleStyle={[styles.filterText,
                    (priorityFilter === 1) ? styles.selectedText : styles.subFilterText]}
                containerStyle={styles.filterSubItem}
                type="clear" 
                onPress={() => setPriorityFilter(1)}
            />
            <Button 
                title="ALL"
                titleStyle={[styles.filterText,
                    (priorityFilter === 0) ? styles.selectedText : styles.subFilterText]}
                containerStyle={styles.filterSubItem}
                type="clear" 
                onPress={() => setPriorityFilter(0)}
            />
        </View>
    }           
    {/* difficulty toggle menu */}
        {difficultyOpen && 
        <View style={styles.container}>
            <Button 
                title="EASY"
                titleStyle={[styles.filterText,
                    (difficultyFilter === 1) ? styles.selectedText : styles.subFilterText]}
                type="clear" 
                onPress={() => setDifficultyFilter(1)}
            />
            <Button 
                title="DOABLE"
                titleStyle={[styles.filterText,
                    (difficultyFilter === 2) ? styles.selectedText : styles.subFilterText]}
                type="clear" 
                onPress={() => setDifficultyFilter(2)}
            />
            <Button 
                title="CHALLENGING"
                titleStyle={[styles.filterText,
                    (difficultyFilter === 3) ? styles.selectedText : styles.subFilterText]}
                type="clear" 
                onPress={() => setDifficultyFilter(3)}
            />
            <Button 
                title="HARD"
                titleStyle={[styles.filterText,
                    (difficultyFilter === 4) ? styles.selectedText : styles.subFilterText]}
                type="clear" 
                onPress={() => setDifficultyFilter(4)}
            />
            <Button 
                title="ALL"
                titleStyle={[styles.filterText,
                    (difficultyFilter === 0) ? styles.selectedText : styles.subFilterText]}
                type="clear" 
                onPress={() => setDifficultyFilter(0)}
            />
        </View>
        }             
    {/* interest toggle menu */}
        {interestOpen && 
        <View style={styles.container}>
            <Button 
                title="FUN"
                titleStyle={[styles.filterText,
                    (interestFilter === 1) ? styles.selectedText : styles.subFilterText]}
                type="clear" 
                onPress={() => setInterestFilter(1)}
            />
            <Button 
                title="MEH"
                titleStyle={[styles.filterText,
                    (interestFilter === 2) ? styles.selectedText : styles.subFilterText]}
                type="clear" 
                onPress={() => setInterestFilter(2)}
            />
            <Button 
                title="TEDIOUS"
                titleStyle={[styles.filterText,
                    (interestFilter === 3) ? styles.selectedText : styles.subFilterText]}
                type="clear" 
                onPress={() => setInterestFilter(3)}
            />
            <Button 
                title="ALL"
                titleStyle={[styles.filterText,
                    (interestFilter === 0) ? styles.selectedText : styles.subFilterText]}
                type="clear" 
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    subContainer: {
        marginBottom: 3,
        marginHorizontal: 15,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    filterItem: {
        flex: 3,
    },
    selectedItem: {
        backgroundColor: 'white'
    },
    notSelected: {
        backgroundColor: 'rgba(255,255,255,0)'
    },
    filterSubItem: {
        flex: 1,
    },
    filterText: {
        fontSize: 10,
        color: 'indigo',
        paddingVertical: 0
    },
    subFilterText: {
        color: 'gray',
    },
    selectedText: {
        color: 'indigo',

    }
    
  });

export default Filter;

