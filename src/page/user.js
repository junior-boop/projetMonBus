import React, {useState} from 'react'
import { View, Text, StatusBar, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import {AuthContext} from '../navigation/context'


export default function UserProfils (){

    const [p, setP] = useState('')
    const [n, setN] = useState('')
    const [t, setT] = useState('')
    const [r, setR] = useState('')
    const [c, setC] = useState('')
    const [pr, setPr] = useState('')
    const [tPr, setTPr] = useState('')
    
    const { signout } = React.useContext(AuthContext)

    const User = async () => {
        await AsyncStorage.getItem('user')
        .then(dt => {
            let user = JSON.parse(dt)
            setP(user.prenom)
            setN(user.nom)
            setR(user.residence)
            setT(user.tel)
            setC(user.cni)
            setPr(user.proche)
            setTPr(user.procheTel)
        })
    }; User()

    let user = `${p} ${n}`

    let LetterSelecter = /\s/
    let prenom = p.split(LetterSelecter)
    let nom = n.split(LetterSelecter)

    let Abr = `${prenom[0][0]}${nom[0][0]}`

    if(prenom === undefined){
        return(
            <View style={{flex : 1, alignItems : 'center', justifyContent : 'center'}}>
                <StatusBar barStyle = 'dark-content' backgroundColor = 'white' />
                <ActivityIndicator size = 'large' color = {'#006bc299'} />
            </View>
        )
    }
    return(
        <View style = {{flex : 1}}>
           <StatusBar barStyle = 'dark-content' backgroundColor = 'white' />
           <ScrollView>
               <View style={{width : '100%', height : 250, alignItems : 'center', justifyContent : 'center', borderBottomWidth : 0.5, borderBottomColor : '#006bc255'}}>
                <View style={{alignItems : 'center'}}>
                    <View style={{width : 100, height : 100, alignItems : 'center', justifyContent : 'center', borderRadius : 50, borderWidth : 0.5, borderColor : '#006bc299', backgroundColor : '#006bc211'}}>
                        <Text style={{fontSize : 24, color : '#006bc2'}}>{Abr}</Text>
                    </View>
                    <View
                        style={{marginTop : 10}}
                    >
                    <Text style={{fontSize : 24, color : '#006bc2'}}>{user}</Text>
                    </View>
                </View>
               </View>
               <View style={{paddingHorizontal :16, marginTop : 16, alignItems : 'center'}}>
                    <View style={{width : '90%'}}>
                        <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>Ville de résidence: </Text>
                        <Text style={{fontSize : 20, fontWeight : "bold", color : '#006bc2', marginBottom : 15}}>{r}</Text>
                    </View>
                    <View style={{width : '90%'}}>
                        <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>Numéro de Téléphone: </Text>
                        <Text style={{fontSize : 20, fontWeight : "bold", color : '#006bc2', marginBottom : 15}}>{t}</Text>
                    </View>
                    <View style={{width : '90%'}}>
                        <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>Numéro de la CNI: </Text>
                        <Text style={{fontSize : 20, fontWeight : "bold", color : '#006bc2', marginBottom : 15}}>{c}</Text>
                    </View>
                    <View style={{width : '90%'}}>
                        <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>Proche en cas D'urgence: </Text>
                        <Text style={{fontSize : 20, fontWeight : "bold", color : '#006bc2', marginBottom : 15}}>{pr}</Text>
                    </View>
                    <View style={{width : '90%'}}>
                        <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>numéro téléphone du proche: </Text>
                        <Text style={{fontSize : 20, fontWeight : "bold", color : '#006bc2', marginBottom : 15}}>{tPr}</Text>
                    </View>
               </View>
               <View style={{width : '100%', height : 69, alignItems : 'center', justifyContent : 'center'}}>
                   <TouchableWithoutFeedback onPress = {() => signout()}>
                       <View style={{width : '100%', borderColor : '#ff2222', borderWidth : 0.3, paddingHorizontal: 36, paddingVertical : 12, borderRadius : 12, backgroundColor : '#ff222233'}}>
                            <Text style = {{color : '#ff2222'}}>Se déconnecter</Text>
                       </View>
                   </TouchableWithoutFeedback>
               </View>
               <View style={{ height : 56, alignItems :'center', justifyContent : 'center', flexDirection : 'row',width : '100%'}}>
            <Text style={{color : '#0005'}}>#GeniusOfDigital - 2021</Text>
          </View>
           </ScrollView>
        </View>
    )
}