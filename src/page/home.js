import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export function Home(props){
    const _ = props.navigation
  return (
    <SafeAreaView style = {Style.content} >
      <StatusBar barStyle = 'light-content' />
      <View>
          <Text>Apparemment cela fonction </Text>
          <TouchableOpacity 
          style = {{ width : 75, height : 30, borderColor : 'black', borderWidth : 1, alignItems : 'center', justifyContent : 'center'}}
          onPress = {() => _.navigate({name : 'login', params : {'name' : 'junior'}})}
          >
              <Text> Login </Text>
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