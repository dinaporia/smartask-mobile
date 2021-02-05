import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';

// components render input fields and pass input back to parent
// rendered by AddTaskPage and EditDetails

const TaskNameInput = props => {
    return (
        <View>
            <TextInput  
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            // disable autofill
            textContentType='none'
            placeholder='Enter new task here'
            onChangeText={text => props.onTextChange(text)}
            value={props.task}
            />
        </View>
    );
}

const TaskCategoryInput = props => {
    return (
        <View>
            <Text>Category:</Text>
            <Picker
                selectedValue={props.category}
                onValueChange={itemValue => props.onSelect('category', itemValue)} 
            >
                <Picker.Item label='Work' value='Work' />
                <Picker.Item label='Home' value='Home' />
                <Picker.Item label='Other' value='Other' />

            </Picker>
        </View>
    );
}


class TaskDateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {show: false};
    }

    handleDateInput = (date) => {
        if (date) { 
        this.setState({show: false});
        const stringDate = date.toString().substring(0, 10);
        this.props.onDateChange(stringDate);
        }}
    

    render() {
        const today = new Date();
        return (
            <ScrollView>
                <View >
                    <Text>Due date</Text>
                    <Button 
                        // on press, set show to true
                        onPress={() => this.setState({show: !this.state.show})}
                        title={(this.props.date) ? this.props.date : today.toLocaleDateString('en-US')}
                        accessibilityLabel='Tap to select due date'
                    />
                </View>
                {/* if show is set to true, show calendar */}
                {this.state.show && (
                    <DateTimePicker
                        value={(this.props.date) || today}
                        mode={'date'}
                        display='default'
                        onChange={(event, selectedDate) => this.handleDateInput(selectedDate)}                      
                    />
                )}
            </ScrollView>
        );
    }
}

export { TaskNameInput, TaskCategoryInput, TaskDateInput };