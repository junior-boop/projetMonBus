import React, {useRef, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ScrollView, Animated, TextInput, KeyboardAvoidingView, Platform, Modal, Dimensions, Image, RefreshControl } from 'react-native';
import { SafeAreaView, withSafeAreaInsets } from 'react-native-safe-area-context';
import {Items, Avatar, HeaderReservation, PersoInfo} from '../components/components'
import db from '../route.json'
import { width, liste } from '../const/const'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {Style} from './style'
import { TouchableNativeFeedback} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import close from '../assets/image/icons8-delete-50.png'

// assets
import paiement from '../assets/image/paiement.png'

function Mois(){
  const D = new Date()
  const mois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  const M = D.getMonth()

  return `${mois[M]}`
}

function calc(a){
  const D = new Date()
  let variable = new Date(D.setDate(D.getDate() + a))
  let y = variable.getDate()
  if(y < 10) {
    return `0${y}`
  } else {
    return `${y}`
  }
}

// Accueil 

export function Note({navigation, route}){
    const v = useRef(new Animated.Value(180)).current;
    const index = useRef( new Animated.Value(1)).current;
    const [resi, setResi] = useState('')
    const [ville, setVille] = useState('Yaoundé')
    const [visible, setVisible] = useState(false)
    const [modal, setModal] = useState(true)

    const _ = navigation
    const $ = route



    const User = async () => {
      await AsyncStorage.getItem('user')
      .then(dt => {
        let user = JSON.parse(dt)
        setResi(user.residence)
      })
    }; User()

    // fonction pour changer la state de la selection
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
    }; villeLabel()

    // fonction pour animer l'entête de la page d'accueil
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


    // fonction pour effectuer un filtre d'élément
    function takeSome(a){
      let Arr = []
      a.filter(el => {
        if(el.depart === villeLabel().abr){
          Arr.push(el)
        }
      })
      return Arr
    }

    // Element de la page
    const Map = (data) => {
      return <Items data = {data} route = {$} navigation = {_} ville = {villeLabel()} />
    }

    function ResidenceVille (a){
      setVisible(!visible)
      setVille(a)
    }

    

  return (
    <SafeAreaView style = {Style.content} >
      <StatusBar barStyle = 'light-content' backgroundColor = 'white' />
        <Animated.View 
            style = {[Style.head, { height : v, position : 'absolute', width : width, overflow : 'hidden', justifyContent: 'center', zIndex : index}]}>
            <View>
            <View style = {[Style.header, {flexDirection :'row', justifyContent : 'space-between', alignItems : 'center'}]}>
              <Text style = {Style.headerTitle}>Guichets</Text>
              <Avatar onPress = {() => _.navigate('profils')} />
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
              <TouchableOpacity> 
                <View
                  style={{height : 48, width : 48, borderRadius : 28, justifyContent : 'center', alignItems : 'center'}}>
                  <Text style = {{fontSize : 18, color : '#006bc2', fontWeight : 'bold'}}>{calc(1)}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity> 
                <View
                  style={{height : 48, width : 48, borderRadius : 28, justifyContent : 'center', alignItems : 'center'}}>
                  <Text style = {{fontSize : 18, color : '#006bc2', fontWeight : 'bold'}}>{calc(2)}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity> 
                <View
                  style={{height : 48, width : 48, borderRadius : 28, justifyContent : 'center', alignItems : 'center'}}>
                  <Text style = {{fontSize : 18, color : '#006bc2', fontWeight : 'bold'}}>{calc(3)}</Text>
                </View>
              </TouchableOpacity>
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
            <View style = {{width : '100%', height : 48, justifyContent : 'center', alignItems : 'center', borderRadius : 12, backgroundColor : '#006bc222', borderColor : '#006bc255', borderWidth : 0.5}}>
              <Text style = {{fontSize : 16, color : '#006bc2'}}>{villeLabel().name}</Text>
            </View>
          </TouchableNativeFeedback>
          <View style={{height : 68, width : '100%', justifyContent : 'center', paddingHorizontal : 16}}>
            <Text style = {{fontSize : 16, color : '#006bc2', paddingLeft : 16, fontWeight : '700'}}>Départ depuis {ville}</Text>
          </View>
          <View>
            {takeSome(db).map(el => Map(el))}
          </View>         
      </ScrollView>
      <Modal
          animationType = 'fade'
          transparent = {true}
          visible = {visible}
          onRequestClose ={() => {setVisible(!visible) ;console.log('Modal fermé')}}
          style={{alignItems : 'center', backgroundColor : 'black', flex : 1, width : '100%'}}
        >
          <View style={{backgroundColor : '#0005', flex : 1, justifyContent : 'center', alignItems : 'center'}}>
            <Animated.View style = {{opacity : 1,  width : '80%', backgroundColor : 'white', borderRadius : 12, marginHorizontal : 4, }}>
              <View style = {{paddingVertical : 13, borderBottomWidth: 0.5, borderBottomColor: 'silver',}}>
                  <Text style = {{fontSize : 16, textAlign : 'center', fontWeight : 'bold'}}> Ville de départ</Text>
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
            </Animated.View>
          </View>
          
        </Modal>
        <Modal 
           animationType = 'fade'
           transparent = {true}
           visible = {modal}
           onRequestClose ={() => {setModal(!modal) ;console.log('Modal fermé')}}
           style={{alignItems : 'center', backgroundColor : 'black', flex : 1, width : '100%', position : 'relative'}}
        >
            <View style={{backgroundColor : '#0005', flex : 1, justifyContent : 'center', alignItems : 'center'}}>
              <View style={{backgroundColor : '#fff', flex : 1, width : '100%', height : '100%'}}>
              <ScrollView 
                  onScroll = {scrollPosition}
                  style = {Style.scrollview}
                  showsVerticalScrollIndicator = {false}
                >
                    
                    <View style = {{height : 180}} />
                    <TouchableNativeFeedback 
                      onPress = {() => setVisible(!visible)}
                      style={{height : 56, width : '100%', justifyContent : 'center', paddingHorizontal : 16}}>
                      <View style = {{width : '100%', height : 48, justifyContent : 'center', alignItems : 'center', borderRadius : 12, backgroundColor : '#006bc222', borderColor : '#006bc255', borderWidth : 0.5}}>
                        <Text style = {{fontSize : 16, color : '#006bc2'}}>{villeLabel().name}</Text>
                      </View>
                    </TouchableNativeFeedback>
                    <View style={{height : 68, width : '100%', justifyContent : 'center', paddingHorizontal : 16}}>
                      <Text style = {{fontSize : 16, color : '#006bc2', paddingLeft : 16, fontWeight : '700'}}>Départ depuis {ville}</Text>
                    </View>
                    <View>
                      {takeSome(db).map(el => Map(el))}
                    </View>         
                </ScrollView>
              </View>
            </View>
            <View style={{position : 'absolute', top : 0, right: 0, opacity : 0.5}}>
                <TouchableNativeFeedback
                    onPress = {() => setModal(false) }
                >
                    <Image source ={close} style = {{width : 20, height : 20, resizeMode : 'contain'}} />
                </TouchableNativeFeedback>
            </View>
        </Modal>
    </SafeAreaView>
  );
}


export function AcccueilDate({navigation, route}){
  const v = useRef(new Animated.Value(180)).current;
  const index = useRef( new Animated.Value(1)).current;
  const [resi, setResi] = useState('')
  const [ville, setVille] = useState('Yaoundé')
  const [visible, setVisible] = useState(false)

  const _ = navigation
  const $ = route



  const User = async () => {
    await AsyncStorage.getItem('user')
    .then(dt => {
      let user = JSON.parse(dt)
      setResi(user.residence)
    })
  }; User()

  // fonction pour changer la state de la selection
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
  }; villeLabel()

  // fonction pour animer l'entête de la page d'accueil
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


  // fonction pour effectuer un filtre d'élément
  function takeSome(a){
    let Arr = []
    a.filter(el => {
      if(el.depart === villeLabel().abr){
        Arr.push(el)
      }
    })
    return Arr
  }

  // Element de la page
  const Map = (data) => {
    return <Items data = {data} route = {$} navigation = {_} ville = {villeLabel()} />
  }

  function ResidenceVille (a){
    setVisible(!visible)
    setVille(a)
  }

return (
  <SafeAreaView style = {Style.content} >
    <StatusBar barStyle = 'light-content' backgroundColor = 'white' />
      <Animated.View 
          style = {[Style.head, { height : v, position : 'absolute', width : width, overflow : 'hidden', justifyContent: 'center', zIndex : index}]}>
          <View>
          <View style = {[Style.header, {flexDirection :'row', justifyContent : 'space-between', alignItems : 'center'}]}>
            <Text style = {Style.headerTitle}>Guichets</Text>
            <Avatar onPress = {() => _.navigate('profils')} />
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
       <View style = {[Style.header, {flexDirection :'row', justifyContent : 'space-between', alignItems : 'center'}]}>
            <Text style = {Style.headerTitle}>Guichets</Text>
        </View>
        <View style={{height : 56, width : '100%', marginTop : 5, justifyContent : 'center', flexDirection : 'row', }}></View>
        <TouchableNativeFeedback 
          onPress = {() => setVisible(!visible)}
          style={{height : 56, width : '100%', justifyContent : 'center', paddingHorizontal : 16}}>
          <View style = {{width : '100%', height : 48, justifyContent : 'center', alignItems : 'center', borderRadius : 12, backgroundColor : '#006bc222', borderColor : '#006bc255', borderWidth : 0.5}}>
            <Text style = {{fontSize : 16, color : '#006bc2'}}>{villeLabel().name}</Text>
          </View>
        </TouchableNativeFeedback>
        <View style={{height : 68, width : '100%', justifyContent : 'center', paddingHorizontal : 16}}>
          <Text style = {{fontSize : 16, color : '#006bc2', paddingLeft : 16, fontWeight : '700'}}>Départ depuis {ville}</Text>
        </View>
        <View>
          {takeSome(db).map(el => Map(el))}
        </View>         
    </ScrollView>
    <Modal
        animationType = 'fade'
        transparent = {true}
        visible = {visible}
        onRequestClose ={() => {setVisible(!visible) ;console.log('Modal fermé')}}
        style={{alignItems : 'center', backgroundColor : 'black', flex : 1, width : '100%'}}
      >
        <View style={{backgroundColor : '#0005', flex : 1, justifyContent : 'center', alignItems : 'center'}}>
          <Animated.View style = {{opacity : 1,  width : '80%', backgroundColor : 'white', borderRadius : 12, marginHorizontal : 4, }}>
            <View style = {{paddingVertical : 13, borderBottomWidth: 0.5, borderBottomColor: 'silver',}}>
                <Text style = {{fontSize : 16, textAlign : 'center', fontWeight : 'bold'}}> Ville de départ</Text>
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
          </Animated.View>
        </View>
        
      </Modal>
  </SafeAreaView>
);
}

console.log(liste.length)

export function NoteId ({route, navigation}) {
  const _ = route.params.params
  const $ = navigation
  const [clientInfo, setInfos] = useState('');
  const [Display, setDisplay] = useState('flex')
  const [count, setCount] = useState(liste.length)
  const [color, setColor] = useState('')
  const [refresh, isRefreshing] = useState(false)

  // modale
  const [visible, setVisible] = useState(false)
  
  const take = async () => {
    await AsyncStorage.getItem('user')
    .then(dt => setInfos(dt))
  }; take()
  
  const client = () =>{
    let Arr = []
    let data = JSON.parse(clientInfo)
    Arr.push(data)
    return Arr
  }; 
  
  const PourMoi = () => {
    setCount(liste.length)
    if(count === 0){
      setDisplay('flex')
      setColor('#f09ed5')
    } else {
      setDisplay('none')
      setColor('#eb51b7')
    }
  }


  let None = (a) => {
    if(a === 'none'){
      setDisplay('none')
    } else {
      setDisplay('flex')
    }
  }


  let AddMe = () => {
    liste.push(client()[0]);
    None('none')
  }

  let disable = () => {
    if(liste.length === 0 ){
      return true
    } else {
      return false
    }
  }

  let Color = () => {
    if(disable() === true){
      return '#f09ed5'
    } else {
      return '#eb51b7'
    }
  }

  // Modale Paiement 
  
  function Paiement() {
    const [tel, setTel] = useState(``)
    const [count, setCount] = useState(1)
    const paiementMode = {
      tel : tel,
      update : Date.now()
    }

    const Tel = async () => {
      await AsyncStorage.getItem('user')
      .then(dt => {
        var user = JSON.parse(dt)
        setTel(user.tel)
      })
    }; Tel()

    function Valid(){
      setVisible(false)
      $.navigate({name : 'valid'})
      console.log(paiementMode)
    }

    const SavePaimentNumber = async () => {
      await AsyncStorage.setItem('PaimentNumber', JSON.stringify(paiementMode))
    }

    const SaveTicket = async () => [
      await AsyncStorage.setItem('Ticket')
    ]

    const Enter = () =>{
      return(
        <View style={{width : '85%', minHeight : 275, height : 275, backgroundColor : 'white', borderRadius : 12, elevation : 5,}}>
          <View>
            <View style={{justifyContent : 'center', alignItems : 'center', width : '100%', height : '80%', padding: 16}}>
                  <View style={{ justifyContent : 'center', alignItems : 'center', width : '100%', height : '30%', padding: 16, marginBottom : 10}}>
                      <Image  source = {paiement} style={{width : 35, height : 35, resizeMode : 'contain'}}/>
                  </View>
                  <Text style={{fontSize : 16, width : '90%', textAlign : 'center', marginBottom : 10}}>Souhaitez-vous effectuer votre paiement avec ce numéro de téléphone ?</Text>
                  <Text style={{fontSize : 18, width : '90%', textAlign : 'center', fontWeight : 'bold' }}>{tel}</Text>
              </View>
              <View style={{flexDirection : 'row', justifyContent : 'flex-end', paddingHorizontal : 16, height : '20%'}}>
                  <TouchableOpacity
                    onPress = {() => setCount(2)}
                  >
                    <Text style = {{paddingHorizontal : 24, paddingVertical : 10, color : '#444', fontWeight : 'bold'}}>Changer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress = {() => setCount(3)}
                  >
                    <Text style = {{paddingHorizontal : 12, paddingVertical : 10, borderRadius : 7, color : 'white', backgroundColor : '#006bc2'}}>Oui</Text>
                  </TouchableOpacity>
              </View>
          </View>
        </View>

      )
    }
  
    const ChangeNumber = () => {
      return(
        <View style={{width : '85%', minHeight : 275, height : 275, backgroundColor : 'white', borderRadius : 12, elevation : 5,}}>
          <View>
              <View style={{justifyContent : 'center', alignItems : 'center', width : '100%', height : '80%', padding: 16}}>
                  <View style={{ justifyContent : 'center', alignItems : 'center', width : '100%', height : '30%', padding: 16,}}>
                      <Image  source = {paiement} style={{width : 35, height : 35, resizeMode : 'contain'}}/>
                  </View>
                  <View style={{width : '100%', marginTop : 16, alignItems : 'center'}}>
                  <Text style={{fontSize : 14, marginBottom : 15, width : '85%', textAlign : 'center',  }}>Veuillez inserer votre nouveau numéro, possédant un compte mobile money</Text>
                    <TextInput
                      onChangeText = {text => setTel(text)}
                      value = {'tel'}
                      placeholder = 'Nouveau numéro de Téléphone'
                      style={{width : '100%', textAlign : 'center', paddingHorizontal : 10, paddingVertical: 7, backgroundColor : '#006bc207', borderRadius : 10, fontWeight : 'bold'}}
                    />
                  </View>
              </View>
              <View style={{flexDirection : 'row', justifyContent : 'flex-end', paddingHorizontal : 16, height : '20%'}}>
                  <TouchableOpacity
                    onPress = {() => setVisible(false)}
                  >
                    <Text style = {{paddingHorizontal : 24, paddingVertical : 10, color : '#444', fontWeight : 'bold'}}>Annuler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress = {() => setCount(1)}>
                    <Text style = {{paddingHorizontal : 12, paddingVertical : 10, borderRadius : 7, color : 'white', backgroundColor : '#006bc2'}}>Valider</Text>
                  </TouchableOpacity>
              </View>
          </View>
        </View>
      )
    }
  
    const Facture = () =>{

      let nbr = () => {
        let x
        if (liste.length < 10){
          return x = `0${liste.length}`
        } else {
          return x = liste.length
        }
      }

      const calc = () => {
        let x = _.prix * liste.length
        return x
      }
      return(
        <View style={{width : '85%', minHeight : 275, height : 350, backgroundColor : 'white', borderRadius : 12, elevation : 5,}}>
        <View>
            <View style={{ alignItems : 'center', width : '100%', height : '77.5%', padding: 16}}>
                
                <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '100%', padding : 16, borderRadius: 12, backgroundColor : '#006bc211'}}>
                    <View style={{width : '50%'}}>
                      <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>Nbre Place</Text>
                      <Text style={{fontSize : 15, fontWeight : "bold", color : '#006bc2', }}>{nbr()}</Text>
                    </View>
                    <View style={{width : '50%'}}>
                      <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>Prix par place</Text>
                      <Text style={{fontSize : 15, fontWeight : "bold", color : '#006bc2', }}>{_.prix} XAF</Text>
                    </View>
                </View>
                <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5, marginTop : 25}}>Montant Total</Text>
                <Text style={{fontSize : 30, fontWeight : "bold", color : '#006bc2', }}>{calc()}</Text>
                <Text style={{fontSize : 15, fontWeight : "bold", color : '#006bc2', }}>XAF</Text>
                <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '100%', paddingHorizontal : 16, paddingVertical : 10, borderRadius: 12, backgroundColor : '#006bc209', marginTop : 25}}>
                    <View style={{width : '70%'}}>
                      <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>Nbre Place</Text>
                      <Text style={{fontSize : 15, fontWeight : "bold", color : '#006bc2', }}>{tel}</Text>
                    </View>
                    <View style={{width : '30%', justifyContent : 'center', alignItems : 'center'}}>
                      <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>orange</Text>
                      
                    </View>
                </View>
            </View>
            <View style={{flexDirection : 'row', justifyContent : 'flex-end', paddingHorizontal : 16, height : '15%', width : '100%', alignItems : 'center', position : 'absolute', bottom : -70}}>
                <TouchableOpacity
                  onPress = {() => setVisible(false)}
                >
                  <Text style = {{paddingHorizontal : 24, paddingVertical : 10, color : '#444', fontWeight : 'bold'}}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress = {() => Valid()}
                >
                  <Text style = {{paddingHorizontal : 12, paddingVertical : 10, borderRadius : 7, color : 'white', backgroundColor : '#006bc2'}}>Valider</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
      )
    }

    function Case(){
      switch (count) {
        case 1 :
          return Enter()
        case 2 : 
          return ChangeNumber()
        case 3 :
          return Facture()
      }
    }

    return(
      <KeyboardAvoidingView>
      <Modal
        animationType = 'fade'
        transparent = {true}
        visible = {visible}
        onRequestClose ={() => {setVisible(!visible) ;console.log('Modal fermé')}}
        style={{backgroundColor : 'black', flex : 1, width : '100%'}} 
      >
        <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', backgroundColor : '#0005',}}>
            {
             Case()
            }
        </View>
      </Modal>
        </KeyboardAvoidingView>
    )
  }

  function wait(timeout){
    return new Promise(resolve => {
      setInterval(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(() => {
    isRefreshing(true)

    wait(2000).then(() => {
      isRefreshing(false)
    })
  })

  const onrefresh = () =>{
    setInterval(() => {
        if(liste.length === 0){
          setDisplay('flex')
        }
    }, 30)
 } ; onrefresh()

  return(
    <View style = {[Style.content, {backgroundColor : 'white'}]} onLayout = {() => PourMoi()}>
      <ScrollView
        // refreshControl = {
        //   <RefreshControl refreshing = {refresh} onRefresh = {onRefresh} />
        // }
      >
        <HeaderReservation data = {_} />
        <PersoInfo data = {_} />
        <View style={{alignItems: 'center', marginBottom : 16, paddingHorizontal: 16, justifyContent :'space-between' }}>
        <Animated.View style={{overflow: 'hidden', display : Display, marginBottom : 12, width : '100%'}}>
            <TouchableNativeFeedback 
              onPress = {() => AddMe()}
              style={{height : 42, width : '100%', backgroundColor : '#65bcbf22', justifyContent : 'center', alignItems : 'center', borderColor : '#65bcbf99', borderWidth : 0.5, overflow: 'hidden',flexDirection : 'row', borderRadius : 12}}>
              <Text style={{color : '#65bcbf', fontSize : 16, fontWeight : 'bold',  }}>Pour Moi</Text>
            </TouchableNativeFeedback>
          </Animated.View>
          <Animated.View style={{overflow: 'hidden', width : '100%'}}>
            <TouchableNativeFeedback 
              onPress = {() => $.navigate({name : 'modal', params : _})}
              style={{height : 42, backgroundColor : '#65bcbf22', justifyContent : 'center', alignItems : 'center', borderColor : '#65bcbf99', borderWidth : 0.5, overflow: 'hidden',flexDirection : 'row', borderRadius : 12, width : '100%'}}>
              <MaterialCommunityIcons 
                name = 'account-plus'
                size = {20}
                color = '#65bcbf'
                 style={{marginRight : 12}}
              />
              <Text style={{color : '#65bcbf', fontSize : 16, fontWeight : 'bold', }}>Ajouter une personne</Text>
            </TouchableNativeFeedback>
          </Animated.View>
        </View>
        <View 
          style={{height : 72}}
        />
      </ScrollView>
      <View style={{ height : 56, width : 56, position : 'absolute', borderRadius : 28,bottom : 16, right : 16, elevation : 10, overflow: 'hidden', }}>
         <TouchableNativeFeedback 
          disabled = {disable()}
          onPress = {() => setVisible(true)}
         style={{ height : 56, width : 56, borderRadius : 28, backgroundColor : Color(), justifyContent : 'center', alignItems : 'center', flexDirection : 'row'}}>
          
          <MaterialCommunityIcons 
              name = 'check-bold'
              size = {24}
              color = 'white'
            />
         </TouchableNativeFeedback>
        </View>
        <Paiement />
    </View>
  )
}

export function Validation ({route, navigation}) {
  const _ = route.params
  const $ = navigation
  return(
    <View style = {[Style.content, {backgroundColor : 'white'}]}>
      <ScrollView>
        
      </ScrollView>
    </View>
  )
}

export function Modale ({route, navigation}) {
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [tel, setTel] = useState('')
  const [cni, setCni] = useState('')
  const [color, setColor] = useState('')
  const _ = route.params
  

  const NewPassager = () => {
    let passager = {
      prenom : prenom,
      nom : nom,
      tel : tel,
      cni : cni 
    };
    
    liste.push(passager)
    
    navigation.goBack()
  }

  const able = () => {
    if(nom === '' || prenom === '' || tel === '' || cni === '') {
      return true
    } else {
      return false
    }
  }

  const Color = () => {
    if(able() === true){
      return '#006bc255'
    } else {
      return '#006bc2'
    }
  }
  

  
  return(
    <KeyboardAvoidingView
      behavior = {Platform.OS === 'ios' ? "padding" : "height"}
      // style = {Style.content}
    >
        <View style={{height : '100%'}}>
        <ScrollView >
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
          <View style={{paddingHorizontal :16, width : '100%'}}>
            <Text style={{width : '100%', fontSize : 20, fontWeight : 'bold', color : '#006bc2'}}> Information passagé</Text>
            <View style={{width : '100%', marginTop : 16, alignItems : 'center'}}>
            <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5, width : '98%'}}>Prénom</Text>
              <TextInput
                onChangeText = {text => setPrenom(text)}
                value = {prenom}
                placeholder = 'le prénom du client'
                style={{width : '100%', fontSize : 18, paddingHorizontal : 10, paddingVertical: 7, backgroundColor : '#006bc207', borderRadius : 10}}
              />
            </View>
            <View style={{width : '100%', marginTop : 16, alignItems : 'center'}}>
            <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5, width : '98%'}}>Nom</Text>
              <TextInput
                onChangeText = {text => setNom(text)}
                value = {nom}
                placeholder = 'Le nom du client'
                style={{width : '100%', fontSize : 18, paddingHorizontal : 10, paddingVertical: 7, backgroundColor : '#006bc207', borderRadius : 10}}
              />
            </View>
            <View style={{width : '100%', marginTop : 16, alignItems : 'center'}}>
            <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5, width : '98%'}}>N° de Téléphone</Text>
            <TextInput
                onChangeText = {text => setTel(text)}
                value = {tel}
                placeholder = 'Le Téléphone'
                style={{width : '100%', fontSize : 18, paddingHorizontal : 10, paddingVertical : 7, backgroundColor : '#006bc207', borderRadius : 10}}
              />
            </View>
            <View style={{width : '100%', marginTop : 16, alignItems : 'center'}}>
            <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5, width : '98%'}}>N° de la CNI</Text>
            <TextInput
                onChangeText = {text => setCni(text)}
                value = {cni}
                placeholder = 'Numéro de la CNI'
                style={{width : '100%', fontSize : 18, paddingHorizontal : 10, paddingVertical : 7, backgroundColor : '#006bc207', borderRadius : 10}}
              />
            </View>
          </View>
          <TouchableOpacity 
            disabled = {able()}
            onPress = {() => NewPassager()}
            style={{flexDirection :'row', marginVertical : 19, marginHorizontal : 16}}
          >
            <View style = {{paddingVertical : 7, paddingHorizontal : 36, backgroundColor : Color(), borderRadius : 7}}>
              <Text style={{fontSize : 16, color : 'white'}}>Ajouter</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        </View>
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