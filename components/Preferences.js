import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { editPrefs, resetPrefs, setDefaultTask, resetDefaultTask } from '../redux/schedulePrefsSlice';

const mapDispatch = {};

const Preferences = (props) => {

   const [hours, setHours] = useState(4);
   const [maxHard, setMaxHard] = useState(1);
   const [maxTedious, setMaxTedious] = useState(1);
   const [includeFun, setIncludeFun] = useState(true);
   

   return (
      <View>
         <Text>Add task</Text>
      </View> 
   );
};


export default connect()(Preferences);