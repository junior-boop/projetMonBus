import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export function Teaching( props ){
    const _ = props.navigation
    console.log(_)
  return (
    <SafeAreaView style = {Style.content} >
      <StatusBar barStyle = 'light-content' backgroundColor = 'white' />
      <View>
          <Text>we're at the teaching page</Text>
          <TouchableOpacity 
          style = {{ width : 75, height : 30, borderColor : 'black', borderWidth : 1, alignItems : 'center', justifyContent : 'center'}}
          onPress = {() => _.navigate('TeachId', { titre : 'l\'enseignement de la journée'})}
          >
              <Text> Home </Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export function TeachId(props) {
    const _ = props.route.params
    // console.log(_)
    return(
        <View>
            <Text>Cool</Text>
        </View>
    )
}

const Style = StyleSheet.create({
  content : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  }
})