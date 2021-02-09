import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

// sort order toolbar, gets access to local sortBy state in ListPage
const SortMenu = ({sortTasks}) => {

    return (
        <View style={styles.container}>
            <Icon style={{marginHorizontal: 5}}    
                size={12}
                name='sort'
                type='font-awesome'
            />
            <Button
                containerStyle={styles.sortItem}
                onPress={() => sortTasks()}
                titleStyle={{fontSize: 12}}
                title="Added"
                type="clear"    
              
            />
            <Button
                containerStyle={styles.sortItem}
                onPress={() => sortTasks("alphabet")} 
                titleStyle={{fontSize: 12}}
                title="A-Z"   
                type="clear"
            />
            <Button
                containerStyle={styles.sortItem}
                onPress={() => sortTasks("due")}
                titleStyle={{fontSize: 12}}
                title="due"
                type="clear"
            />
            <Button
                containerStyle={styles.sortItem}
                onPress={() => sortTasks("priority")} 
                titleStyle={{fontSize: 12}}
                title="Priority"
                type="clear"
            />  
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 3,
        marginBottom: 1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    sortItem: {
        flex: 1,
    },
    sortText: {
        textAlign: 'center',
        fontSize: 12
    }
});

export default SortMenu;
