import React, {useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Login } from '../page/login'
import { Home } from '../page/home';
import { AcccueilDate, Modale, Note, NoteId, Validation } from '../page/note'
import { Teaching ,TeachId } from '../page/teaching'
import { Meditated } from '../page/meditated'

import { Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { AuthContext } from './context'
import UserProfils from '../page/user'
import { check } from '../const/const'


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator()


export default function Navigation() {
    
    check()

    const initialState = {
        isLoading : true,
        userTel : null,
        userToken : null
    }
    
    const loginState = (prevtState, action) => {
        switch (action.type){
            case 'REGISTER' : 
             return {
                ...prevtState,
                userTel : action.tel,
                userToken : action.token,
                isLoading : false
             };
            case 'LOGIN' : 
             return {
                ...prevtState,
                userTel : action.tel,
                userToken : action.token,
                isLoading : false
             };
            case 'LOGOUT' : 
             return {
                ...prevtState,
                userTel :null,
                userToken : null,
                isLoading : false
             }
            case 'RESTRIEVE_TOKEN' : 
             return {
                 ...prevtState,
                 userToken : action.Token,
                 isLoading : false
             }
        }
    }
    
    const [loginReduc, dispatch] = React.useReducer(loginState, initialState)

    const authContext = React.useMemo(() => ({
        signin : async (userTel, userPassWord) => {
            await AsyncStorage.getItem('user')
            .then(dt => {
                let user = JSON.parse(dt)
                let userToken
                userToken = null
                console.log(user);
                if(userTel === user.tel && userPassWord === user.mot_de_passe){
                    userToken = 'viaqjbzjvnpfeivzjbrpvijbezrpvrjbzvpijrbvipzjrbvfipjrzpvciubqzebîohazêhf'
                }

                dispatch({type : 'LOGIN', tel : userTel, token : userToken})
            })
        },
        signout : () => {
            dispatch({type : 'LOGOUT'})
        },
        signup : () => {
            
        }
    }), [])

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type : 'RESTRIEVE_TOKEN', token : 'viaqjbzjvnpfeivzjbrpvijbezrpvrjbzvpijrbvipzjrbvfipjrzpvciubqzebîohazêhf'})
        }, 1000)
    }, [])

    if( loginReduc.isLoading ) {
        return(
            <View style={{flex : 1, alignItems : 'center', justifyContent : 'center'}}>
                <StatusBar barStyle = 'dark-content' backgroundColor = 'white' />
                <ActivityIndicator size = 'large' color = {'#006bc299'} />
            </View>
        )
    }
    console.log(loginReduc.isLoading, loginReduc.userToken)
    return(
        <AuthContext.Provider value = {authContext}>
            <NavigationContainer>
                {
                    loginReduc.userToken !== null ? (
                        <Stack.Navigator>
                            <Stack.Screen name = 'app' component = {TabNavigation} options = {{headerShown : false}} />
                            <Stack.Screen name = 'noteId' component = { NoteId } options = {{headerStyle : {elevation : 0}, headerTitle : 'Achat de Billet'}} />
                            <Stack.Screen name = 'modal' component = {Modale} options = {{cardStyle : {backgroundColor : '#fff'}, headerTitle : 'Ajouter une personne', headerStyle : {elevation : 0}}}  />
                            <Stack.Screen name = 'valid' component = {Validation} options = {{cardStyle : {backgroundColor : '#fff'}, headerTitle : 'Ticket Validé', headerStyle : {elevation : 0}}} />
                            <Stack.Screen name = 'profils' component = { UserProfils } options = {{cardStyle : {backgroundColor : '#fff'}, headerTitle : 'Profils', headerStyle : {elevation : 0}}} />
                            <Stack.Screen name = 'resevation' component = { AcccueilDate } options = {{cardStyle : {backgroundColor : '#fff'}, headerTitle : 'Profils', headerStyle : {elevation : 0}}} />
                            <Stack.Screen name = 'meditId' component = { NoteId } />
                            <Stack.Screen name = 'TeachId' component = { TeachId } options = {{title : ({route}) => {route}}} />
                        </Stack.Navigator>
                    ) 
                    : (
                        <Stack.Navigator>
                            <Stack.Screen name = 'login' component = { Login } options = {{headerShown : false}} />
                            <Stack.Screen name = 'home' component = { Home } options = {{headerShown : false}}/>
                        </Stack.Navigator>
                    )
                }
                
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

const optionTab = {
    note : {
        title: 'Billets', tabBarIcon: ({color}) => (<Fontisto name="bus-ticket" size={20} color = {color} />)
    },
    vers : {
        title: 'Achetez', tabBarIcon: ({color}) => (<MaterialCommunityIcons name="ticket" size={20} color= {color} />)
    }, 
    medit : {
        title: 'Historique', tabBarIcon: ({color}) => (<Fontisto name="history" size={20} color= {color} />)
    }
}

const TabNavigation = () => {
    return(
        <Tab.Navigator 
            shifting = 'true'
            initialRouteName="note"
            activeColor= '#006bc2'
            inactiveColor= '#5555'
            barStyle={{ backgroundColor: 'white', elevation : 0 }}
        >
            <Tab.Screen name = 'note' component = {Note} options = {optionTab.note} />
            <Tab.Screen name = 'vers' component = {Teaching} options = {optionTab.vers} />
            <Tab.Screen name = 'medite' component = {Meditated} options = {optionTab.medit} />
        </Tab.Navigator>
    )
}