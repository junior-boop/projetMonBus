import React, {useRef, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView, FlatList, Animated, TextInput, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Items, Avatar, HeaderReservation, PersoInfo} from '../components/components'
import { SimpleLineIcons } from '@expo/vector-icons';
import data from '../database/bus.json';
import {width} from '../const/const'
import {editor } from '../RTE/index'
import {text} from '../RTE/text'
import { MaterialCommunityIcons } from '@expo/vector-icons';


const db = data

import {Style} from './style'
import WebView from 'react-native-webview';
import { TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';

function Mois(){
  const D = new Date()
  const mois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  const M = D.getMonth()

  return `${mois[M]}`
}

function calc(a){
  const D = new Date()
  const day = D.getDate()

  const y = day + a
  if(y < 10) {
    return `0${y}`
  } else {
    return `${y}`
  }
}


export function Note( props ){
    const v = useRef(new Animated.Value(180)).current;
    const index = useRef( new Animated.Value(1)).current;
    const [visible, setVisible] = useState(false)

    const _ = props.navigation
    const $ = props.route

    const scrollPosition = (e) => {
      const pos = e.nativeEvent.contentOffset.y
      Animated.timing(v, {
        duration : 1,
        toValue : 180 - cof(pos),
        useNativeDriver : false
      }).start();

      if(cof(pos) > 170){
        Animated.timing(index, {
          duration : 1,
          toValue : 0,
          useNativeDriver : false
        }).start();
      } else {
        Animated.timing(index, {
          duration : 1,
          toValue : 1,
          useNativeDriver : false
        }).start();
      }
    }

    const cof = (value) => {
      return value * 1;
    }

    const Map = (item, key) => {
      return <Items navigation = {_} route = {$} data = {item} id = {key} />
    }



  return (
    <SafeAreaView style = {Style.content} >
      <StatusBar barStyle = 'light-content' backgroundColor = 'white' />
        <Animated.View 
            style = {[Style.head, { height : v, position : 'absolute', width : width, overflow : 'hidden', justifyContent: 'center', zIndex : index}]}>
            <View>
            <View style = {[Style.header, {flexDirection :'row', justifyContent : 'space-between', alignItems : 'center'}]}>
              <Text style = {Style.headerTitle}>Notes</Text>
              <Avatar />
            </View>
            <View style={{height : 56, width : '100%', marginTop : 5, justifyContent : 'center', flexDirection : 'row', }}>
              <View
                style={{height : 48, width : 48, borderRadius : 28, justifyContent : 'center', alignItems : 'center'}}>
                <Text style = {{fontSize : 18, color : '#006bc2', fontWeight : 'bold'}}>{calc(-3)}</Text>
              </View>
              <View
                style={{height : 48, width : 48, borderRadius : 28, justifyContent : 'center', alignItems : 'center'}}>
                <Text style = {{fontSize : 18, color : '#006bc2', fontWeight : 'bold'}}>{calc(-2)}</Text>
              </View>
              <View
                style={{height : 48, width : 48, borderRadius : 28, justifyContent : 'center', alignItems : 'center'}}>
                <Text style = {{fontSize : 18, color : '#006bc2', fontWeight : 'bold'}}>{calc(-1)}</Text>
              </View>
              <View
                style={{height : 48, width : 48, borderRadius : 28, backgroundColor : '#006bc2', justifyContent : 'center', alignItems : 'center'}}>
                <Text style = {{fontSize : 18, color : 'white'}}>{calc(0)}</Text>
              </View>
              <View
                style={{height : 48, width : 48, borderRadius : 28, justifyContent : 'center', alignItems : 'center'}}>
                <Text style = {{fontSize : 18, color : '#006bc2', fontWeight : 'bold'}}>{calc(1)}</Text>
              </View>
              <View
                style={{height : 48, width : 48, borderRadius : 28, justifyContent : 'center', alignItems : 'center'}}>
                <Text style = {{fontSize : 18, color : '#006bc2', fontWeight : 'bold'}}>{calc(2)}</Text>
              </View>
              <View
                style={{height : 48, width : 48, borderRadius : 28, justifyContent : 'center', alignItems : 'center'}}>
                <Text style = {{fontSize : 18, color : '#006bc2', fontWeight : 'bold'}}>{calc(3)}</Text>
              </View>
            </View>
            <View style = {{justifyContent : 'center', alignItems : 'center', height: 25}}>
              <Text style={{fontSize : 16, fontWeight : 'bold', color : '#006bc2'}}>{Mois()}</Text>
            </View>
            </View>
          </Animated.View>
      <ScrollView 
      onScroll = {scrollPosition}
      style = {Style.scrollview}
      showsVerticalScrollIndicator = {false}
      >
          
          <View style = {{height : 180}} />
          <TouchableNativeFeedback 
          onPress = {() => setVisible(!visible)}
          style={{height : 56, width : '100%', justifyContent : 'center', paddingHorizontal : 16}}>
            <View style = {{width : '100%', height : 48, justifyContent : 'center', alignItems : 'center', borderRadius : 12, backgroundColor : '#00000077'}}>
              <Text style = {{fontSize : 16, color : 'white'}}>Douala</Text>
            </View>
          </TouchableNativeFeedback>
          <View style={{height : 68, width : '100%', justifyContent : 'center', paddingHorizontal : 16}}>
            <Text style = {{fontSize : 16, color : 'white'}}>Départ à Douala</Text>
          </View>
          {
            db.map(el => Map(el))
          }         
      </ScrollView>
      <Modal
          animationType = 'fade'
          transparent = {true}
          visible = {visible}
          onRequestClose ={() => console.log('Modal fermé')}
          style={{alignItems : 'center', backgroundColor : 'black', flex : 1, width : '100%'}}
        >
          <View style={{backgroundColor : '#0005', flex : 1}}>
            <TouchableWithoutFeedback style={{flex : 1, borderColor : 'black', borderWidth : 1, height : '60%'}}>

            </TouchableWithoutFeedback>
            <View style = {{height : 250, width : '98%', backgroundColor : 'white', borderstartRadius : 12, marginHorizontal : 4,bottom : 0, position: 'absolute' }}>
              <Text> Ceci est le Modal</Text>
              <TouchableOpacity onPress = {() => setVisible(!visible)}>
                <Text> Ceci est le Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </Modal>
    </SafeAreaView>
  );
}


export function NoteId ({route, navigation}) {
  const _ = route.params.params
  const $ = navigation
  return(
    <View style = {[Style.content, {backgroundColor : 'white'}]}>
      <ScrollView>
        <HeaderReservation data = {_} />
        <PersoInfo data = {_}/>
        <View style={{alignItems: 'center', marginBottom : 16}}>
          <View style={{overflow: 'hidden', borderRadius : 12, width : '90%'}}>
            <TouchableNativeFeedback 
              onPress = {() => $.navigate({name : 'modal', params : _})}
            style={{height : 42, backgroundColor : 'white', justifyContent : 'center', alignItems : 'center', borderColor : '#65bcbf', borderWidth : 1, overflow: 'hidden',flexDirection : 'row'}}>
              <MaterialCommunityIcons 
                name = 'account-plus'
                size = {20}
                color = '#65bcbf'
                 style={{marginRight : 12}}
              />
              <Text style={{color : '#65bcbf', fontSize : 16, fontWeight : 'bold', }}>Ajouter une personne</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View 
          style={{height : 72}}
        />
      </ScrollView>
      <View style={{width : 56, height : 56, position : 'absolute', borderRadius : 28,bottom : 16, right : 16, elevation : 10, overflow: 'hidden', }}>
         <TouchableNativeFeedback style={{width : 56, height : 56, borderRadius : 28, backgroundColor : '#eb51b7', justifyContent : 'center', alignItems : 'center' }}>
          <MaterialCommunityIcons 
              name = 'check-bold'
              size = {24}
              color = 'white'
            />
         </TouchableNativeFeedback>
        </View>
    </View>
  )
}

export function Modale ({route}) {
  const [value, setValue] = useState('La valeur')
  const [tel, setTel] = useState('655733765')
  const [cni, setCni] = useState('')
  const [color, setColor] = useState('white')
  const focus = useRef(new Animated.Value(0)).current
  const _ = route.params
  
  const Focus = (e) => {
    if(e.target){
      setColor('black')
      Animated.timing(focus,{
        duration : 500,
        toValue : 300
      })
    } else {
      setColor('white')
    }
  }
  return(
    <KeyboardAvoidingView
      behavior = {Platform.OS === 'ios' ? "padding" : "height"}
      // style = {Style.content}
    >
        <ScrollView>
          <View style={{alignItems: 'center', marginVertical : 16}}>
            <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '90%', padding : 16, borderRadius: 12, backgroundColor : '#006bc211'}}>
                <View style={{width : '33%'}}>
                  <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>Type</Text>
                  <Text style={{fontSize : 15, fontWeight : "bold", color : '#006bc2', }}>{_.type}</Text>
                </View>
                <View style={{width : '32%'}}>
                  <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>Horaire</Text>
                  <Text style={{fontSize : 15, fontWeight : "bold", color : '#006bc2', }}>12 h 30</Text>
                </View>
                <View style={{width : '33%'}}>
                  <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>Destination</Text>
                  <Text style={{fontSize : 15, fontWeight : "bold", color : '#006bc2', }}>{_.Arrivé}</Text>
                </View>
            </View>
          </View>
          <View style={{alignItems : 'center'}}>
            <Text style={{width : '90%', fontSize : 20, fontWeight : 'bold', color : '#006bc2'}}> Information passagé</Text>
            <View style={{width : '90%', marginTop : 16, alignItems : 'center'}}>
            <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5, width : '98%'}}>Nom Au complet</Text>
              <TextInput
                onFocus = {({nativeEvent}) => Focus(nativeEvent)}
                onChangeText = {text => setValue(text)}
                value = {value}
                placeholder = {value}
                style={{width : '98%', fontSize : 18, paddingHorizontal : 10, paddingVertical: 7, backgroundColor : '#006bc207', borderRadius : 10}}
              />
            </View>
            <View style={{width : '90%', marginTop : 16, alignItems : 'center'}}>
            <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5, width : '98%'}}>N° de Téléphone</Text>
            <TextInput
                onFocus = {({nativeEvent}) => Focus(nativeEvent)}
                onChangeText = {text => setTel(text)}
                value = {tel}
                placeholder = {tel}
                style={{width : '98%', fontSize : 18, paddingHorizontal : 10, paddingVertical : 7, backgroundColor : '#006bc207', borderRadius : 10}}
              />
            </View>
            <View style={{width : '90%', marginTop : 16, alignItems : 'center'}}>
            <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5, width : '98%'}}>N° de la CNI</Text>
            <TextInput
                onFocus = {({nativeEvent}) => Focus(nativeEvent)}
                onChangeText = {text => setCni(text)}
                value = {cni}
                placeholder = {cni}
                style={{width : '98%', fontSize : 18, paddingHorizontal : 10, paddingVertical : 7, backgroundColor : '#006bc207', borderRadius : 10}}
              />
            </View>
          </View>
          <TouchableOpacity style={{flexDirection :'row', marginVertical : 19, marginHorizontal : 16}}>
            <View style = {{paddingVertical : 7, paddingHorizontal : 36, backgroundColor : '#006bc2', borderRadius : 7}}>
              <Text style={{fontSize : 16, color : 'white'}}> Valider</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

function Calender(){
  const liste = [
    {
      mois : 'janvier',
      valeur : 1,
      nbrJours : 31
    },
    {
      mois : 'fevrier',
      valeur : 2,
      nbrJours : 28
    },
    {
      mois : 'mars',
      valeur : 3,
      nbrJours : 31
    },
    {
      mois : 'avril',
      valeur : 4,
      nbrJours : 30
    },
    {
      mois : 'mai',
      valeur : 5,
      nbrJours : 31
    },
    {
      mois : 'juin',
      valeur : 6,
      nbrJours : 30
    },
    {
      mois : 'juillet',
      valeur : 7,
      nbrJours : 31
    },
    {
      mois : 'août',
      valeur : 8,
      nbrJours : 31
    },
    {
      mois : 'septembre',
      valeur : 9,
      nbrJours : 30
    },
    {
      mois : 'octobre',
      valeur : 10,
      nbrJours : 31
    },
    {
      mois : 'novembre',
      valeur : 11,
      nbrJours : 30
    },
    {
      mois : 'décembre',
      valeur : 12,
      nbrJours : 31
    }
  ]
  const a = `12/11/2020`
  const t = new Date(a)

  liste.filter(el => {
    if(t.getMonth() === el.valeur){
    }
  })
}

Calender()