import * as React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {Style} from '../components/style'
import { width, liste } from '../const/const';
import bus from '../assets/image/bus.png'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react/cjs/react.development';

// import Assets
import close from '../assets/image/icons8-delete-50.png'


export const Items = (props) => {
    const _ = props.navigation
    const $ = props.route
    const data = props.data
    const ville = props.ville

    function date(){
        const D = new Date()
        const day = D.getDate()
        const mois = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec']
        const M = D.getMonth()
      
        function currentMois(){
          return `${mois[M]}`
        }
      
        if(day < 10) {
          return `0${day} ${currentMois()}`
        } else {
          return `${day} ${currentMois()}`
        }
      }

    const ref = (item) => {
        return <Text style = {Style.ref}> {item} </Text>
    }

    return(
        <View style = {Style.container}>
            <TouchableNativeFeedback 
            onPress = {() => _.navigate('noteId', {params : data})}
            style = {Style.note}
            >
                <View>
                    <View style = {Style.Items}>
                        <View style={{width : '33%'}}>
                            <View style = {{marginBottom : 12,}}>
                                <Text style = {[Style.leftGros, {color : '#006bc2'}]}>{ville.abr}</Text>
                                <Text style = {[Style.leftPetit, {color : '#006bc255'}]}>{ville.name}</Text>
                            </View>
                            <View>
                                <Text style = {{fontWeight : 'bold', color : 'silver'}}>Date</Text>
                                <Text style = {{fontSize : width * 0.05, color : '#006bc2'}}>{date()}</Text>
                            </View>
                        </View>
                        <View style = {{alignItems : 'center'}}>
                            <View style = {{alignItems : 'center', width : 50, height: 50, marginBottom : 8}}>
                                <Image 
                                     style = {Style.itemsImages}
                                     source = {{uri : data.logo}}
                                />
                            </View>
                            <View style = {{alignItems : 'center'}}>
                                <Image 
                                    style = {{width : 50, height :43, marginBottom : 2,  resizeMode : 'contain'}}
                                    source = {bus}
                                />
                                <Text style = {{color : '#999', fontSize : 12}}>{data.place} Pls restantes</Text>
                            </View>
                        </View>
                        <View style={{width : '33%'}}>
                            <View style = {{marginBottom : 12}}>
                                <Text style = {[Style.rightGros, {color : '#006bc2'}]}>{data.abr}</Text>
                                <Text style = {[Style.rightPetit, {color : '#006bc255'}]}>{data.Arrivé}</Text>
                            </View>
                            <View>
                                <Text style = {Style.depart}>Départ</Text>
                                <Text style = {Style.heure}>{data.heure}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style = {Style.ligne} />
                        <View style = {[Style.test, {justifyContent : 'space-between', alignItems : 'center'}]}>
                            <View style = {Style.itemsFooter}>
                                <Text>{data.type}</Text>
                            </View>
                            <View style = {Style.test}>
                                <Text>Prix : </Text>
                                <Text style={{fontWeight : 'bold', color : '#ad8e00'}}>{data.prix} FCFA</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export const Avatar = ({onPress}) => {
    const [name, setName] = useState('')
    const [nom, setNom] = useState('')


    const User = async () => {
        await AsyncStorage.getItem('user')
        .then(dt => {
            let user = JSON.parse(dt)
            setName(user.prenom)
            setNom(user.nom)
        })
    }
    User()

    let Name = `${name} ${nom[0]}.`

    return(
        <View>
            <TouchableWithoutFeedback onPress = {onPress} >
                <View style={{flexDirection : 'row', alignItems : 'center'}}>
                    <View style={{width : 100, marginRight : 12}}>
                        <Text style={{color : '#006bc2', fontSize : 18, fontWeight : 'bold', textAlign : 'right', textTransform : 'capitalize'}}>{Name}</Text>
                    </View>
                    <View style={{borderColor : '#006bc2', borderWidth : 0.2, width : 36, height: 36, justifyContent : 'center', alignItems : 'center', borderRadius : 24}}>
                        <MaterialCommunityIcons name="account" size={24} color= '#006bc2' />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export function HeaderReservation({data}) {
    const _ = data

    // const prix = new Intl.NumberFormat('fr-FR', {type : 'currency', currency : 'XAF'}).format(_.prix)
    return(
        <View style={{width: '100%', justifyContent : 'center', alignItems : 'center'}}>
          <View style = {{backgroundColor : '#006bc211',  width : '90%', borderRadius : 12, marginVertical : 15, padding : 15, borderWidth : 0.3, borderColor : '#006bc299'}}>
            <View style={{ flexDirection : 'row', justifyContent : 'space-between'}}>
                <View style={{width : '33%'}}>
                    <Text style = {[Style.leftGros, {color : '#006bc2'}]}>{_.depart}</Text>
                    <Text style = {[Style.leftPetit, {color : '#006bc299', opacity : 0.75}]}>{_.Ville}</Text>
                </View>
                <View style={{alignItems : 'center'}}>
                    <Image 
                        source = {{ uri : _.logo}}
                        style = {[Style.itemsImages]}
                        />
                    
                </View>
                <View style={{width : '33%'}}>
                    <Text style = {[Style.rightGros, {color : '#006bc2'}]}>{_.abr}</Text>
                    <Text style = {[Style.rightPetit, {color : '#006bc299', opacity : 0.75}]}>{_.Arrivé}</Text>
                </View>
            </View>
            <View style={{alignItems : 'center'}}>
                <View style = {{ flexDirection : 'row', justifyContent : 'center'}} >
                    <View style={{backgroundColor : 'white'}}>
                    <View style={{
                        height : 30,
                        backgroundColor : 'red',
                        marginTop : 10,
                        marginBottom : 10,
                    }} />
                    </View>
                    <View style={{alignItems : 'center'}}>
                        <Text style={{fontSize : 45, color: '#006bc2'}}>{_.prix}</Text>
                        <Text style={{fontSize : 20, color : '#006bc2', opacity : 0.75, marginTop : -10,}}>Franc CFA</Text>
                    </View>
                    <View style={{
                        height : 30,
                        backgroundColor : '#fff',
                        marginTop : 10,
                        marginBottom : 10,
                    }} />
                </View>
                <Text style={{fontSize: 16, fontWeight : 'bold', marginVertical : 10, color : '#006bc2'}}>{_.place} places restantes</Text>
            </View>
          </View>
        </View>
    )
}


export const PersoInfo = ({data}) => {
    const _ = data
    const [p, setP] = useState('')

    const refresh = () =>{
       setInterval(() => {
           let x = JSON.stringify(liste)
            setP(x)
       }, 500)
    } ; refresh()

    return(
        <View style = {{justifyContent : 'center', alignItems : 'center', marginBottom : 16}} >
          <View style={{width : '90%', padding : 16, borderColor: '#006bc255', borderWidth : 0.5, borderRadius : 12}}>
            {
                liste.length !== 0 ?
                (
                    liste.map((el, i) => {
                        let name = `${el.prenom} ${el.nom}`
                        return(
                            <View style={{borderBottomWidth: 0.5, borderBottomColor: '#006bc233', marginBottom : 12}}>
                                <View>
                                        <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>Ticket pour :</Text>
                                        <Text style={{fontSize : 20, fontWeight : "bold", color : '#006bc2', marginBottom : 15}}>{name}</Text>
                                        <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>N° Tel:</Text>
                                        <Text style={{fontSize : 20, fontWeight : "bold", color : '#006bc2', marginBottom : 15}}>+237 {el.tel}</Text>
                                        
                                        <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>N° CNI:</Text>
                                        <Text style={{fontSize : 15, fontWeight : "bold", color : '#006bc2', marginBottom : 15}}>{el.cni}</Text>
                                    </View>
                                    <View style={{position : 'absolute', top : 0, right: 0, opacity : 0.5}}>
                                        <TouchableNativeFeedback
                                            onPress = {() => liste.splice(i, 1)}
                                        >
                                            <Image source ={close} style = {{width : 20, height : 20, resizeMode : 'contain'}} />
                                        </TouchableNativeFeedback>
                                    </View>
                            </View>
                            )
                    })
                ) : 
                null
            }
            <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
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
        </View>
    )
}