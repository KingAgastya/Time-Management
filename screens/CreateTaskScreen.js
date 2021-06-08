import React, {Component} from 'react'
import {Text, StyleSheet, View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert, TextInput} from 'react-native'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'
import db from '../config'
import {RFValue} from 'react-native-responsive-fontsize'
import * as googleapis from 'googleapis'

export default class CreateTaskScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            userId : firebase.auth().currentUser.email,
            taskName : '',
            description : '',
            dataSource : '',
            showFlatlist : '',
            hr : '',
            min : '',
            sec : '',
            time : ""
        }
    }

    addTask =async(taskName, description)=>{
        var userId = this.state.userId
        var time = this.state.time
        db.collection("task_to_do").add({
            "task_name" : taskName,
            "description" : description,
            "user_id" : userId,
            "task_status" : ongoing,
            "time" : time,
            "date" : firebase.firestore.FieldValue.serverTimestamp()
        })

        this.setState({
            taskName : "",
            description : ""
        })

        return Alert.alert("Task Created")
    }

    getTimeAtStart(){
        var hr = hour();
        var min = minute();
        var sec = second();
    }
    
    render(){
        return(
            <ScrollView>
                <View style = {styles.container}>
                    <MyHeader title = "Create A Task"/>
                    <KeyboardAvoidingView style = {styles.keyBoardStyle}>

                        <TextInput style = {styles.formTextInput}
                        placeholder = {"Enter Task Name"}
                        onChangeText ={()=>{
                            this.setState({
                                taskName : text
                            })
                        }}
                        value = {this.state.taskName}/>

                        

                        <TextInput style = {[styles.formTextInput, {height : RFValue(300)}]}
                        multiline
                        numberOfLines = {8}
                        placeholder = {"Description"}
                        onChangeText ={()=>{
                            this.setState({
                                description : text
                            })
                        }}
                        value = {this.state.description}/>

                        <TextInput style = {[styles.formTextInput], {positionx : WindowWidth - 100, positiony : WindowHeight - 50}}
                        placeholder = {"Hours"}
                        onChangeText ={()=>{
                            this.setState({
                                hr : text
                            })
                        }}
                        value = {this.state.hr}/>

                        <TextInput style = {[styles.formTextInput], {positionx : WindowWidth - 100, positiony : WindowHeight - 50}}
                        placeholder = {"Minutes"}
                        onChangeText ={()=>{
                            this.setState({
                                min : text
                            })
                        }}
                        value = {this.state.min}/>

                        <TextInput style = {[styles.formTextInput], {positionx : WindowWidth - 100, positiony : WindowHeight - 50}}
                        placeholder = {"Seconds"}
                        onChangeText ={()=>{
                            this.setState({
                                sec : text
                            })
                        }}
                        value = {this.state.sec}/>

                        

                        <TouchableOpacity style = {styles.button}
                        onPress ={() =>{
                            this.addTask(this.state.taskName, this.state.description)
                            this.getTimeAtStart()
                            this.setState({
                                time : this.state.hr + " : " + this.state.min + " : " + this.state.sec
                            })
                        }}>
                            <Text>Add</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : RFValue(1)
    },
    keyBoardStyle : {
        fontSize : RFValue(20),
        width : RFValue(30),
        height : RFValue(30),
        backgroundColor : "lime",
        padding : RFValue(2),
        margin : RFValue(10),
        borderWidth : RFValue(3)
    },
    formTextInput : {
        color : 'black',
        fontSize : RFValue(20),
        textAlign : 'center',
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : RFValue(3)
    },
    button : {
        alignItems : 'center',
        justifyContent : 'center',
        textAlign : 'center'
    }
})