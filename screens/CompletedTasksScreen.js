import React, {Component} from 'react'
import {Text, StyleSheet, View, FlatList, TouchableOpacity, ScrollView, KeyboardAvoidingView} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'
import {RFValue} from 'react-native-responsive-fontsize'

export default class CompletedTasksScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            userId : firebase.auth().currentUser.email,
            completedTasks : []
        }
    }

    getCompletedTaskList =()=> {
        db.collection("task_to_do").where("task_status", "==", completed).get("task_name")
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    taskList : doc.data()["task_name"]
                })
            })
        })    
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ( {item, i} ) =>{
        return (
          <ListItem
            key = {i}
            title = {item.task_name}
            subtitle = {item.description}
            titleStyle = {{ color: 'black', fontWeight: 'bold' }}
            rightElement = {
                <TouchableOpacity style = {styles.button}
                onPress ={() =>{
                  this.props.navigation.navigate("ReceiverDetails", {"details" : item})
                }}>
                  <Text style = {{color:'#ffff'}}> View </Text>
                </TouchableOpacity>
              }
            bottomDivider
            />
        )
    }

    render(){
        return(
            <ScrollView>
                <KeyboardAvoidingView>
                    <View style = {styles.container}>
                        <MyHeader title = "Completed Tasks"/>
                        {
                            this.state.taskList !== 0
                            ? (
                                <FlatList
                                data = {this.state.completedTasks}
                                keyExtractor = {this.keyExtractor}
                                renderItem = {this.renderItem}/>)
                            : (
                                <Text>You have no completed tasks</Text>
                            )
                        }
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    }
})