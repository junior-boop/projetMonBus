import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BibleRout, VersRead } from '../components/components';
import { Style } from './style';
import WebView from 'react-native-webview';
import data from '../database/test.json'

import {width} from '../const/const'

const Header = ({nav}) => {
  return(
    <View style = {Style.head}>
      <View style = {Style.header}>
        <Text style = {Style.headerTitle}>Verset</Text>
      </View>
      <View style = {Style.container}>
        <BibleRout onPress = {() => nav.navigate('BibleRead')} />
      </View>
    </View>
  )
}

const VersListe = (navig) => {
  const _ = navig

  const Map = (item) => {
    return <VersRead goto = {_} data = {item} />
  }
  return(
    <View style = {Style.vers}>
      <View>
        <Text style = {Style.versTitre}> Verset de reference </Text>
      </View>
      <View>
        {
          data.verset.map(el => Map(el))
        }
      </View>
    </View>
  )
}

export function Vers( props ){
    const _ = props.navigation
  return (
    <SafeAreaView style = {Style.content} >
      <StatusBar barStyle = 'light-content' backgroundColor = 'white' />
      <ScrollView style = {Style.scrollview}>
          <Header nav = {_} />  
          <VersListe navig = {_} />
      </ScrollView>
    </SafeAreaView>
  );
}

export function VersId (props) {
  const _ = props.route.params.params
  if(_){
    return(
      <View style = {Style.content}>
       <WebView
      originWhitelist = {['*']}
      style = {{borderColor : 'black', borderWidth : 1, width : width}}
      source = {{html : _.contenu}}
    />
      </View>
    )
  } else if(_ === undefined || _ === null){
    return(
      <View style = {Style.content}>
        <Text> Contenu vide</Text>
      </View>
    )
  }
}