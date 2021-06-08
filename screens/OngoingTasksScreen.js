import React, {Component} from 'react'
import {Text, StyleSheet, View, ScrollView, FlatList} from 'react-native'
import db from '../config'
import firebase from 'firebase'

export default class OngoingTasksScreen extends React.Component{

    constructor(){
        super()
        this.state = {
            userId : firebase.auth().currentUser.email,
            taskList : []
        }
    }

    getOngoingTaskList =()=> {
        db.collection("task_to_do").where("task_status", "==", ongoing).get("task_name")
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
                <View style = {styles.container}>
                    <MyHeader title = "Ongoing Tasks"/>
                    
                    {
                        this.state.taskList !== 0
                        ? (
                            <FlatList
                            data = {this.state.taskList}
                            keyExtractor = {this.keyExtractor}
                            renderItem = {this.renderItem}/>)
                        : (
                            <Text>You have no ongoing tasks</Text>
                        )
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    }
})