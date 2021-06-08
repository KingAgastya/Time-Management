import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'

export const AppStackNavigator = createStackNavigator({
    Home : {screen : HomeScreen, navigationOptions : {headerShown : false}},
},
{
    initiateRouteName : 'Home'
})