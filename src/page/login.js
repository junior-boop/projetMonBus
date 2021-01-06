import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Button, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AuthContext} from '../navigation/context'

const height = Dimensions.get('screen').height

export function Login( props ){
    const _ = props.navigation
    const [tel, setTel] = useState('')
    const [pw, setPw] = useState('')

    let  connect = {}
    function able(){
      if(pw === '' || tel === ''){
        return true
      } else {
        return false
      }
    }
    if(pw === '' || tel === ''){
      connect = {backgroundColor : '#006bc255'}
    } else {
      connect = {backgroundColor : '#006bc2'}
    }
    const { signin } = React.useContext(AuthContext)

  return (
    <SafeAreaView style = {Style.content} >
      <KeyboardAvoidingView>
        <ScrollView >
        <StatusBar barStyle = 'light-content' backgroundColor = 'white' />
          <View style = {{justifyContent : 'center', alignItems : 'center', height : height - 24}}>
            <View style={Style.login}>
                <View>
                  <Text style = {Style.title}>Connectez-vous</Text>
                  <Text style = {Style.paragraph}>Veuillez insérer votre numéro de téléphone et mot de passe pour pouvoir accéder à votre compte. </Text>
                </View>
                <View>
                  <TextInput 
                    onChangeText = {t => setTel(t)}
                    value = {tel}
                    style={Style.input}
                    autoCompleteType = "tel"
                    placeholder = {'Téléphone'}
                  />
                  <TextInput 
                    onChangeText = {t => setPw(t)}
                    value = {pw}
                    style={Style.input}
                    autoCompleteType = "password"
                    placeholder = {'Mot de passe'}
                    secureTextEntry
                    keyboardType = 'visible-password'
                  />
                </View>
                <TouchableOpacity style={{paddingVertical : 12}}>
                  <Text style={{color : '#006bc2'}}>Mot de Passe oublié</Text>
                </TouchableOpacity>
                <View style={{flexDirection : 'row'}}>
                  <View style = {Style.bouton}>
                    <TouchableOpacity style={[Style.BoutonInner, connect]} disabled = {able()} onPress = {() => signin(tel, pw)}>
                      <Text style = {{color : 'white'}}>Continuer</Text>
                    </TouchableOpacity>
                  </View>
                  <View style = {Style.bouton}>
                    <TouchableOpacity style={Style.BoutonOther}  onPress = {() => _.navigate('home')}>
                      <Text style = {{color : 'black'}}>Créer un compte</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
          </View>
          <View style={{ position : 'absolute', bottom : 0, height : 56, alignItems :'center', justifyContent : 'center', flexDirection : 'row',width : '100%'}}>
            <Text style={{color : '#0005'}}>#GeniusOfDigital - 2021</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const Style = StyleSheet.create({
  content : {
    flex : 1,
    backgroundColor : 'white'
  },

  login : {
    width : '90%',
    padding: 12,
    borderColor : '#006bc255',
    borderWidth : 0.5,
    borderRadius : 12
  },
  title : {
    fontSize : 18,
    fontWeight : 'bold',
    color : '#006bc2',
    marginBottom : 10,
  },
  paragraph : {
    fontSize : 14,
    color :'#0009'
  },
  input :{
    paddingVertical : 7,
    paddingHorizontal : 10,
    marginTop :20,
    borderRadius : 7,
    fontSize : 16,
    backgroundColor : '#006bc209'
  },
  BoutonInner : {
    paddingHorizontal : 18,
    paddingVertical : 7,
    borderRadius : 7,
    marginTop : 16,
  },
  bouton :{
    flexDirection : 'row'
  },
  BoutonOther : {
    paddingHorizontal : 18,
    paddingVertical : 7,
    borderRadius : 7,
    marginTop : 16,
  },
})