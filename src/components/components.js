import * as React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import {Style} from '../components/style'
import { width } from '../const/const';
import bus from '../assets/image/bus.png'
import label from '../assets/image/Finex.png'

import { MaterialCommunityIcons } from '@expo/vector-icons';




export const Items = (props) => {
    const _ = props.navigation
    const $ = props.route
    const data = props.data

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
                                <Text style = {[Style.leftGros, {color : '#006bc2'}]}>dla</Text>
                                <Text style = {[Style.leftPetit, {color : '#006bc255'}]}>Douala</Text>
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

export const BibleRout = ({onPress}) => {
    return(
        <View style = {Style.bibleRead}>
            <View>
                <Image 
                    source = {{ uri : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAJo0lEQVR4nO2bf2xT1xXHP/fZaX6R2AmhTGsKAWKgrFPpL6GKsiJwWgIpnRrSbpo0TepfY+p+iLXdD01Kp0ldN63dH0NaV6lbN2kdS2hFIXVJKKVbx6AlHdBSCEkDtAFSEnB+2LH9/N67+8N+jh2b2O85SVOV71/n+p1z7r3nnXfPOfdewzVcwxca4rMeQDLuvb9xuTTEThBRp6E3+Hwv9013n8p0d5ArvN4mlzTYBawAeYuuKJtnot/ZYgChFMoXQSwFkDCKInwz0fGsMMC9G7f8XMID8aYU8Ej77pYzM9H3tBmgvv5b5Zs3by7Lxufd1OiVgmazLYR8uqOttSWJRdTX1xdOyyCZwkXw3vsbl0tdfBuFDUhWAOagwyA6Qe5efefNv21ubjZMmXUbH1zoEMoRoAoAyX5RIH8mNXE3UtyDIlchuT7O7gdOg9wrFF5q373z1FSMO28DrN/8zfmKHv098BBZPEoI0dS+p6UV4K6mpuI5IbqQ8sb4Y1UiVIGck0O3BtDqNIxt+UaKvD6B+zZtWePQo0eBb0zUVVJSTHFxcaIthODxJ77/k7OX+x85d+X86urryp5LmjzAdVebvMPhyDTuhzRFObp+Y9OGfOZg2wPq6h9cjaLsBUrN31bdeRv193m5deVXKS4qAmB4ZJRTXd243eUs89QyODrEmBqm4/X97HjplTS9c6sqWbaslqXLavEsXcK8+VVE9CiHTn1A35k+eo9309fzMVJKU0QVBl9v97Xaihq2DBB3+xPAXAC328UT2x7l9ltvySprSIML/gEMKTl08F0uXRpk0eIFzJkzh8pKNy63K6PcmBqh80wXujQYOH+Jt199k+BQIPEYIVd27NnZbXUuab6VC2prl78A3AlQ4XbxzK9/yfJlnpxkhRBENA1N16i+8QaWLfcwf/71VFS4KYp7TSYUOJwIAf6xAKXlpdSsWELf6Y9RwxGAAolY2dv94V+szsXyGlDX0OgBmszJPL7tUaqrv2xJR0H6N50Tqivn4YzLFpcWs3ZLHQ5nrC1gTV3DlnVWdVo2gJBiK/FP565Vd+Tk9hm02JABRSjML69ItF1VLjwrl48zSLZa1mlVQMJak964wWtVHIitA3ZRWZqaW3luvSm5ua65udnSnCwxr137nSLgZoi5/80rbsoikRm6oduSAygrKklpu6pcFJcmwq37YOf7S63os2SAoqLwlwAnQEWFm5KS4iwSmRHVNFtyANc5C9LWkLLK8chhGFRb0WfJALoSrTJpd3m5FdEEorqGlocHADgVZ0q7sHi8VBCSeVZ0WTKAQEmsQGXlWeucjAipEVtyyXA4UoddWJISPiut6LKdCivC+koupWQ0HLTbZQIOJXXYImksUlEsDcyaASQJ3zXGU9GcMRoeQzfsRwATE3UkpcUo0lqIsWQAw4lq0lFVnYw1DaoWZTgUyM6YAzQ9dQ0xtPG2IWTUii5ra4A0PjXpy35/znK6oTMYGEp5U/lgogFCwVCCFlL5dCL/ZLBkgGixctGk/f6h3GR0jU+Hr6QN2i4kMu0TCAXHErSh6BcnykwGSwY40NISILYzg6pGuTQwOMlAY998//DlvMNeMnTdQDLuSVJKAv7RpOeOT6zosxMFjpnEia6ulLTWkBJVizI0NspF/wD+4MiUub2JsWhqGB25PIIWjSdWgksHXmvpt6LPmZ0lFQKOmvXA+ydPseSmJYmQaCcyWMVYJJzS9l9K8kKDo1b12fGAwyZx8kRXrF8pZ2TyAMEJBrh45kKClgrvWNVn2QCqUrCP2KYkZ3rPEQjkn9hYwZg6bgApJRd6x/dEFYnlbTHLBjiw+6VB4AiAYRgce++4VRV5IZhkgMELA4QCiQjgd5WIwxmFJoHdVPhlk3j734dsqrCOiBYlnJSA9R4/nfRU7mppabEcbuwZwOH8G8TS4p7uM1y8YCn3sA1/cDzcRaNRzp7sTbQVxAt2dNoyQMer/7gAYi/EvkNfW4cdNZYxGBhO0N2dp4hGEllv99621rft6LRdDUqMZ006tr09YFdVTtANnSuBmAfoms7Jdz8YfyjkM4CtMGTbAPvadu4jHhINw+CV1j12VeWE/hF/Iun68PDx5MWvz6mP/dmu3ryOxoTBkyb97uH3+PDElJxXpkFKSd/lmIcFhwKcOJhIRhHwlM/ns73LkpcB2n2tPqTYbbb//td/olosk3NB//AVQvEU+J2Og2iJ8lccU4ODf8pHd973A6QwfgiEAfr7B9jZsjuLhDVEdY3ewViB13PsNOd7ErWOROEHBw4csL/Dis2jsWT0dp/013q+oiKoAzjbe45azyLmXV+VTTQrItEox/t6CasqgeFR3tq5D0OPF1+S5zraWrfn24flYigTXKU8MzQmHgC5WkrJH7e/wI9+/D0WLV6YxquqKv/rPM7prh78/mGkIXFXulhQU83K22+hoLCAkKriD47QPxxb+IIjAfbvaE8Oe73RUvHYVIx9ym6IeDc1LhaIw8RvezicDlbfvYrb7liJy13OkH+IziPHOHLoPcKRzGuW0+lg4Yol1KxYzBx3GZFQhPM9n3Cq8wTRcGJtCRlCrH9jT8t/p2LcWQ3g3dToVRAPSVgD3EjSfYBZjiiSZztea31iMqarfgJ1DY0eDPE8cM/MFLpTjgIEWwHrBvDe33Q3htyFsHbIMMugCiH/kI0p7ROoa2j0IMUh4icsBQUFbNrgZd3aNdQsXEBRUewY6srlECND4YninwUkUm5b5Jn7bHbWdKR7gCGeN9981dxKftX8UxYvqklhGR4Kz5bJg+Rpu5OHCYlQXcOW9QjugdibzzR5TTMYuhJiluCsRkVzdrarI8UAQvKwSW+qr0ubPMDocIQZ2v7LConc7vGIvE5bUwxgCL5m0uvXrskoEBqzdPI0rTAQr+erY6IH3GDSCxZkvmegafkfbk4VIhHtbL46UgwgbW4qfJ4x4aCdxCb7uXOZT5iczllxwx6AwkJn+iJlEamzkfItk3zjzX9lFCguKci3zymDAvVToCOpYSg7TLrt9X30fJT+n4UyVyE2LodMCwRs7e6Wef2XIMUA7b6W/RLxJoCmafziyafSjOB0Krgr7d0OmwbUOPE/mZ3t6kh7l+vqH17iUPTDxC9CO51ONsZT4UU1CxK3wGdTKiyQj9XUzv2dHeGMzhy/Cr+LuBE+p0gph70Njb8RUmxFsj25RM64pHf4Xv6PbjhWAW/M0GCnA2Y5DICQ4rtAafJvMMmm6H7fjo862lq9CsY64DmQJ4GpueU0M5hYDm8HgrmUyNdwDV8g/B8vVK2ePs+HtgAAAABJRU5ErkJggg==`}}
                    style = {{
                        resizeMode : 'cover',
                        height : 75,
                        width : 75, 
                        marginRight : 12
                    }}
                />
            </View>
            <View>
                <View style = {Style.BibleContMess}>
                    <Text style = {Style.bibleMess}>Don't Stop to read your Bible, is a food of your Spirit, a light on your feet</Text>
                </View>
                <View style = {Style.test}>
                    <TouchableOpacity 
                    style={Style.Read}
                    onPress = {onPress}
                    >
                        <Text style = {{color : 'white', fontWeight : 'bold'}}> Read Bible </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export const VersRead = (props) => {
    
    // const Decimal = (v) => {
    //     const nbr = new Intl.NumberFormat().format(v)
    //     return nbr
    // }


    const _ = props.goto.navig
    const data = props.data
    console.log(data)
    return(
       <View onLayout =  {({nativeEvent}) => console.log(nativeEvent.layout.height)} style = {{marginBottom: 16}}>
            <TouchableNativeFeedback 
            
            onPress = {() => _.navigate('versId', {params : data})}
            style = {Style.verset}>
                <View>
                    <Text style = {Style.versetText}>{data.verset}</Text>
                    <Text style = {Style.versetTitre}>{data.titre}</Text>
                    <View style = {[Style.test, {justifyContent : 'space-between'}]}>
                        <Text style = {Style.versetPast}>{data.orateur}</Text>
                        <View style = {Style.test}>
                            <Text style = {{fontSize : 11, paddingVertical: 3}}>Lu par {data.lecteurs} </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text>
                        {data.scrap_cont}
                    </Text>
                </View>
                <View style={[Style.test, {justifyContent : 'space-between', marginTop : 10}]}>
                    <View>
                        <Text style = {{fontSize : 11, color : 'silver'}}>Publié - {data.update}</Text>
                    </View>
                    <View>
                        <Text style = {{fontSize : 11}}> Part</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
       </View>
    )
}

export const Avatar = () => {
    return(
        <View>
            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                <View style={{width : 100, marginRight : 12}}>
                    <Text style={{color : '#006bc2', fontSize : 18, fontWeight : 'bold', textAlign : 'right'}}>Daniel</Text>
                    <Text style={{textAlign : 'right'}}>655733765</Text>
                </View>
                <View style={{borderColor : '#006bc2', borderWidth : 1, width : 42, height: 42, justifyContent : 'center', alignItems : 'center', borderRadius : 24}}>
                    <MaterialCommunityIcons name="account" size={32} color= '#006bc2' />
                </View>
            </View>
        </View>
    )
}

export function HeaderReservation({data}) {
    const _ = data

    // const prix = new Intl.NumberFormat('fr-FR', {type : 'currency', currency : 'XAF'}).format(_.prix)
    return(
        <View style={{width: '100%', justifyContent : 'center', alignItems : 'center'}}>
          <View style = {{backgroundColor : '#006bc2',  width : '90%', borderRadius : 12, marginVertical : 15, padding : 15}}>
            <View style={{ flexDirection : 'row', justifyContent : 'space-between'}}>
                <View style={{width : '33%'}}>
                    <Text style = {[Style.leftGros, {color : 'white'}]}>Dla</Text>
                    <Text style = {[Style.leftPetit, {color : 'white', opacity : 0.75}]}>Douala</Text>
                </View>
                <View style={{alignItems : 'center'}}>
                    <Image 
                        source = {{ uri : _.logo}}
                        style = {[Style.itemsImages]}
                        />
                    
                </View>
                <View style={{width : '33%'}}>
                    <Text style = {[Style.rightGros, {color : 'white'}]}>{_.abr}</Text>
                    <Text style = {[Style.rightPetit, {color : 'white', opacity : 0.75}]}>{_.Arrivé}</Text>
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
                        <Text style={{fontSize : 45, color: 'white'}}>{_.prix}</Text>
                        <Text style={{fontSize : 20, color : 'white', opacity : 0.75, marginTop : -10,}}>Franc CFA</Text>
                    </View>
                    <View style={{
                        height : 30,
                        backgroundColor : '#fff',
                        marginTop : 10,
                        marginBottom : 10,
                    }} />
                </View>
                <Text style={{fontSize: 16, fontWeight : 'bold', marginVertical : 10, color : 'white'}}>{_.place} places restantes</Text>
            </View>
          </View>
        </View>
    )
}

export const PersoInfo = ({data}) => {
    const _ = data
    return(
        <View style = {{justifyContent : 'center', alignItems : 'center', marginBottom : 16}}>
          <View style={{width : '90%', padding : 16, borderColor: '#006bc2', borderWidth : 0.5, borderRadius : 12}}>
            <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>Ticket pour :</Text>
            <Text style={{fontSize : 20, fontWeight : "bold", color : '#006bc2', marginBottom : 15}}>Daniel Seppo Eke</Text>
            <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>N° Tel:</Text>
            <Text style={{fontSize : 20, fontWeight : "bold", color : '#006bc2', marginBottom : 15}}>+237 655733765</Text>
            
            <Text style={{fontSize : 14, fontWeight : "bold", color : '#006bc299', marginBottom : 5}}>N° CNI:</Text>
            <Text style={{fontSize : 15, fontWeight : "bold", color : '#006bc2', marginBottom : 15}}>003533765</Text>
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