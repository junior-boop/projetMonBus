import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Button, TouchableOpacity, KeyboardAvoidingView, ScrollView,  Dimensions, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const height = Dimensions.get('screen').height


export function Home(props){
    const _ = props.navigation
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [cni, setCni] = useState('')
    const [proche, setProche] = useState('')
    const [procheTel, setProcheTel] = useState('')
    const [tel, setTel] = useState('')
    const [ville, setVille] = useState('Yaoundé')
    const [pw, setPw] = useState('')
    const [visible, setVisible] = useState(false)

    let personal = {
      nom : nom,
      prenom : prenom,
      tel : tel,
      cni : cni,
      proche : proche,
      procheTel : procheTel,
      residence : ville,
      mot_de_passe : pw
    }

    const Save = async () => {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(personal))
        console.log()
      } catch (error) {
        console.log(error);
      }
    }

    const Submit = () => {
      Save()
      _.navigate('login')

    }
    

    let  connect = {}
    function able(){
      if(pw === '' || tel === '' || prenom === '' || proche ==='' || nom === '' || cni === ''){
        return true
      } else {
        return false
      }
    }
    if(pw === '' || tel === '' || prenom === '' || proche ==='' ||  nom === '' || cni === ''){
      connect = {backgroundColor : '#006bc255'}
    } else {
      connect = {backgroundColor : '#006bc2'}
    }
    function villeLabel(){
      let type = {}
      switch (ville){
        case 'Douala' : 
          return type = {name : 'Douala', abr : 'Dla'};
        case 'Yaoundé' :
          return type = {name : 'Yaoundé', abr : 'Ydé'};
        case 'Bafoussam' :
          return type = {name : 'Bafoussam', abr : 'Baf'};
      }
    }

    function ResidenceVille (a){
      setVisible(!visible)
      setVille(a)
    }
    const Modale = () => {
      return(
        <Modal
        animationType = 'fade'
        transparent = {true}
        visible = {visible}
        onRequestClose ={() => {setVisible(!visible)}}
        style={{alignItems : 'center', backgroundColor : 'black', flex : 1, width : '100%'}}
      >
        <View style={{backgroundColor : '#0005', flex : 1, justifyContent : 'center', alignItems : 'center'}}>
          <View style = {{opacity : 1,  width : '80%', backgroundColor : 'white', borderRadius : 12, marginHorizontal : 4, }}>
            <View style = {{paddingVertical : 13, borderBottomWidth: 0.5, borderBottomColor: 'silver',}}>
                <Text style = {{fontSize : 16, textAlign : 'center', fontWeight : 'bold'}}> Ville de résidence</Text>
            </View>
            <TouchableOpacity 
            style = {{paddingVertical : 13}}
            onPress = {() => ResidenceVille('Yaoundé')}>
              <Text style = {{fontSize : 16, textAlign : 'center'}}>Yaoundé</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style = {{paddingVertical : 13}}
            onPress = {() => ResidenceVille('Bafoussam')}>
              <Text style = {{fontSize : 16, textAlign : 'center'}}>Bafoussam</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style = {{paddingVertical : 13}}
            onPress = {() => ResidenceVille('Douala')}>
              <Text style = {{fontSize : 16, textAlign : 'center'}}>Douala</Text>
            </TouchableOpacity>
            <View style={{justifyContent : 'center', alignItems : 'center', marginVertical: 12}}>
              <TouchableOpacity 
              style = {{paddingVertical : 7, width : '43%', backgroundColor : '#006bc2', borderRadius : 7}}
              onPress = {() => setVisible(!visible)}>
                <Text style = {{fontSize : 16, textAlign : 'center', color : 'white'}}>Annuler</Text>
              </TouchableOpacity>
            </View>             
          </View>
        </View>
        
      </Modal>
      )
    } 

  return (
    <SafeAreaView style = {Style.content} >
      <KeyboardAvoidingView>
        <ScrollView >
        <StatusBar barStyle = 'light-content' backgroundColor = 'white' />
          <View style = {{ alignItems : 'center', height : height - 24}}>
            <View style={Style.login}>
                <View>
                  <Text style = {Style.title}>Créer votre compte</Text>
                  <Text style = {Style.paragraph}>Veuillez remplire tous les champs. </Text>

                </View>
                <View>
                    <TextInput 
                      onChangeText = {t => setPrenom(t)}
                      value = {prenom}
                      style={Style.input}
                      autoCompleteType = "name"
                      placeholder = {'Prénom'}
                    />
                    <TextInput 
                      onChangeText = {t => setNom(t)}
                      value = {nom}
                      style={Style.input}
                      autoCompleteType = "username"
                      placeholder = {'Nom'}
                    />
                    <TextInput 
                      onChangeText = {t => setTel(t)}
                      value = {tel}
                      style={Style.input}
                      autoCompleteType = "tel"
                      placeholder = {'Téléphone '}
                    />
                    <TextInput 
                      onChangeText = {t => setCni(t)}
                      value = {cni}
                      style={Style.input}
                      autoCompleteType = "cc-number"
                      placeholder = {'Numéro de la CNI'}
                      keyboardType = 'visible-password'
                    />
                    <TextInput 
                      onChangeText = {t => setProche(t)}
                      value = {proche}
                      style={Style.input}
                      autoCompleteType = "name"
                      placeholder = {'Nom du proche en cas d\'urgence'}
                    />
                    <TextInput 
                      onChangeText = {t => setProcheTel(t)}
                      value = {procheTel}
                      style={Style.input}
                      autoCompleteType = "tel"
                      placeholder = {'Son Numéro de téléphone'}
                      keyboardType = 'visible-password'
                    />
                    <TextInput 
                      onChangeText = {t => setPw(t)}
                      value = {pw}
                      style={Style.input}
                      autoCompleteType = "password"
                      placeholder = {'Mot de passe'}
                      keyboardType = 'visible-password'
                    />
                   <TouchableNativeFeedback 
                      onPress = {() => setVisible(!visible)}
                      style={{width : '100%', justifyContent : 'center', paddingVertical : 10}}>
                      <View >
                        <Text style = {Style.input}>{villeLabel().name}</Text>
                      </View>
                    </TouchableNativeFeedback>
                    
                </View>
                <View style={{flexDirection : 'row'}}>
                  <View style = {Style.bouton}>
                    <TouchableOpacity style={[Style.BoutonInner, connect]} disabled = {able()} onPress = {() => Submit()}>
                      <Text style = {{color : 'white'}}>Validation</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
          </View>
          <Modale />
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
    width : '100%',
    padding: 12,
    marginTop : 25
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
    marginTop :10,
    borderBottomWidth: 0.2,
    fontSize : 14,
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