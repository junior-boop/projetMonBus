import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export function Login( props ){
    const _ = props.navigation
    console.log(_)
  return (
    <SafeAreaView style = {Style.content} >
      <StatusBar barStyle = 'light-content' backgroundColor = 'white' />
      <View>
          <Text>we're at the loader page</Text>
          <TouchableOpacity 
          style = {{ width : 75, height : 30, borderColor : 'black', borderWidth : 1, alignItems : 'center', justifyContent : 'center'}}
          onPress = {() => _.push('home')}
          >
              <Text> Home </Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Style = StyleSheet.create({
  content : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  }
})