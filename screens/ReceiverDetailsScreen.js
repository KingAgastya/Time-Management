import React from 'react'
import {Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import {Card, Header, Icon} from 'react-native-elements'
import CompletedTasksScreen from './CompletedTasksScreen'
import OngoingTasksScreen from './OngoingTasksScreen'
import HomeScreen from './HomeScreen'
import {RFValue} from 'react-native-responsive-fontsize'

export default class ReceiverDetailsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userId : firebase.auth().currentUser.email,
            taskName : this.props.navigation.getParam("details")["task_name"],
            description : this.props.navigation.getParam("details")["description"],
            taskStatus : "",
            message : ""
        }
    }

    getTaskStatus =()=> {
        db.collection("task_to_do").where("docId", "==", qgfQMsTnaKJlUxf7S7m1).get("task_status")
        .then((snapshot) => { 
            this.setState({
                taskStatus : doc.id()["task_status"]
            })
        })    
    }

    addNotifications =()=>{
        var alert = this.state.message
        var message = this.state.taskName + "has been completed at" + firebase.firestore.FieldValue.serverTimestamp() + "it" + alert
        db.collection("all_notifications").doc(jDqgXkoaaofwXLwHjgla).add({
            "targeted_user_id" : this.state.recieverId,
            "donor_id" : this.state.userId,
            "request_id" : this.state.requestId,
            "book_name" : this.state.bookName,
            "date" : firebase.firestore.FieldValue.serverTimestamp(),
            "notification_status" : "unread",
            "message" : message
        })

        var finished = this.state.taskName + ""
    }

    updateTaskStatus =()=>{
        db.collection("task_to_do").add({
            task_name : this.state.taskName,
            task_status : "completed"
        })
        return Alert.alert("Task Completed")

        var hr = hour()
        var min = min()
        var sec = sec()
        var time = hr + " : " + min + " : " + sec

        if(db.collection("task_to_do").doc(qgfQMsTnaKJlUxf7S7m1).time >= time){
            Alert.alert("Task completed on time")
            this.setState({
                message : " was completed on time"
            })
        }
        else{
            this.setState({
                message : " was not completed on time"
            })
            Alert.alert("Task not completed on time")
        }
    }

    getTaskStatusAtEnd =()=>{
        var task_status = this.state.taskStatus

        if(task_status === ongoing){
            this.props.navigation.navigate('OngoingTasks')
        }
        else if(task_status === completed){
            this.props.navigation.navigate('CompletedTasks')
        }
        else{
            this.props.navigation.navigate('Home')
        }
    }

    render(){
        return(
            <ScrollView>
                <KeyboardAvoidingView>
                    <View style = {styles.container}>

                        <View style = {{flex : 0.1}}> 
                            <Header leftComponent = {<Icon Name = "arrow-left" type = "feather" color = "#00ffff" onPress ={()=>{
                            this.props.navigation.goBack()}}/>}
                            centerComponent = {{text : "Task Details", style = {color : "blue", fontSize : 30, fontWeight : 'bold'}}}
                            backgroundColor = "#ffff00"/>
                        </View>

                        <View style = {{flex : 0.4}}>
                            <Card title = {"Task Info"} titleStyle = {{fontSize : 30}}>
                                <Card><Text style = {{fontWeight : "bold"}}>Name : {this.state.taskName}</Text></Card>
                                <Card><Text style = {{fontWeight : 'bold'}}>Reason : {this.state.description}</Text></Card>
                            </Card>
                        </View>

                        <View style = {styles.buttonContainer}>
                            <TouchableOpacity style = {styles.button}
                            onPress ={() =>{
                                this.updateTaskStatus()
                                this.addNotifications()
                                this.getTaskStatusAtEnd()
                            }}
                            >
                                <Text style = {style.buttonText}>Mark as complete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : RFValue(1)
    },
    buttonContainer : {
        flex : RFValue(0.5),
        padding : RFValue(1),
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth : 3
    },
    button : {
        height : RFValue(20),
        width : RFValue(50),
        alignItems : 'center',
        justifyContent : 'center',
        alignSelf : 'center',
        textAlign : 'center'
    },
    buttonText : {
        justifyContent : 'center',
        alignSelf : 'center',
        textAlign : 'center',
        color : 'black',
        fontWeight : 'bold'
    }
})