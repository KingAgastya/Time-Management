import React from 'react'
import {Text, StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native'
import CreateTaskScreen from './CreateTaskScreen'
import OngoingTasksScreen from './OngoingTasksScreen'
import CompletedTasksScreen from './CompletedTasksScreen'
import {RFValue} from 'react-native-responsive-fontsize'

export default class HomeScreen extends React.Component{

    //Providing links to all screens
    render(){
        return(
            <ScrollView>
                <View style = {styles.container}>

                    <View style = {{padding : 1}}>
                    
                    <TouchableOpacity style = {styles.button}
                    onPress ={()=>{
                        this.props.navigation.navigate(CreateTaskScreen)
                    }}>
                        <Text style = {style.buttonText}>Create a task</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.button}
                    onPress ={()=>{
                        this.props.navigation.navigate(OngoingTasksScreen)
                    }}>
                        <Text style = {style.buttonText}>Ongoing Tasks</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.button}
                    onPress ={()=>{
                        this.props.navigation.navigate(CompletedTasksScreen)
                    }}>
                        <Text style = {style.buttonText}>Completed Tasks</Text>
                    </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        )
    }
}

//Creating styles
const styles = StyleSheet.create({
    container : {
        flex : RFValue(1)
    },
    button : {
        backgroundColor : 'orange',
        textAlign : 'center',
        justifyContent : 'center',
        alignItems : 'center'
    },
    buttonText : {
        color : '#ffffff',
        fontWeight : 'bold',
        fontSize : RFValue(40)
    }
})