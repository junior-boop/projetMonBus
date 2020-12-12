import React, {Component} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Login } from '../page/login'
import { Home } from '../page/home';
import { Modale, Note, NoteId } from '../page/note'
import { TeachId, Teaching } from '../page/teaching'
import { Meditated } from '../page/meditated'
import { Vers, VersId } from '../page/vers'
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Bible, BibleId } from '../page/readBible'

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator()

const Mod = () => {
    return(
        <Stack.Navigator
            headerMode = 'none'
            screenOptions = {{animationEnabled : true, }}
            mode = 'modal'

        >
            
        </Stack.Navigator>
    )
}

export default class Navigation extends React.Component{
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name = 'login' component = { Login } options = {{headerShown : false}} />
                    <Stack.Screen name = 'home' component = { Home } />
                    <Stack.Screen name = 'app' component = {TabNavigation} options = {{headerShown : false}} />
                    <Stack.Screen name = 'noteId' component = { NoteId } options = {{headerStyle : {elevation : 0}, headerTitle : 'Achat de Billet'}} />
                    <Stack.Screen name = 'modal' component = {Modale} options = {{cardStyle : {backgroundColor : '#fff'}, headerTitle : 'Ajouter une personne', headerStyle : {elevation : 0}}} />
                    <Stack.Screen name = 'versId' component = { VersId } options = {{headerStyle : {elevation : 0}}} />
                    <Stack.Screen name = 'meditId' component = { NoteId } options = {{}} />
                    <Stack.Screen name = 'TeachId' component = { TeachId } options = {{title : ({route}) => {route}}} />
                    <Stack.Screen name = 'BibleRead' component = { Bible } options = {{headerStyle : {elevation : 0}, headerTitle : 'Bible'}} />
                    <Stack.Screen name = 'bibleId' component = { BibleId } options = {{headerStyle : {elevation : 0}, headerTitle : ''}} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}


const optionTab = {

    note : {
        title: 'Notes',
        tabBarIcon: ({color}) => (
            <FontAwesome name="sticky-note" size={20} color = {color} />
          )
    },
    vers : {
        title: 'Versets',
        tabBarIcon: ({color}) => (
            <FontAwesome5 name="bible" size={20} color= {color} />
          )
    }, 
    medit : {
        title: 'Méditation',
        tabBarIcon: ({color}) => (
            <FontAwesome5 name="book-open" size={20} color= {color} />
          )
    },
    teach : {
        title : 'Enseignements',
        tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="triangle" size={20} color= {color} />
          )
    }
}

const TabNavigation = () => {
    return(
        <Tab.Navigator 
            shifting = 'true'
            initialRouteName="note"
            activeColor= '#64c5eb'
            inactiveColor= '#555'
            barStyle={{ backgroundColor: 'white', elevation : 0 }}
        >
            <Tab.Screen name = 'note' component = {Note} options = {optionTab.note} />
            <Tab.Screen name = 'vers' component = {Vers} options = {optionTab.vers } />
            <Tab.Screen name = 'medite' component = {Meditated} options = {optionTab.medit} />
            {/* <Tab.Screen name = 'teach' component = {Teaching} options = {optionTab.teach}/> */}
        </Tab.Navigator>
    )
}