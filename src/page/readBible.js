import React, {useRef, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback, ScrollView, Animated, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {Style} from './style'
import livre from '../database/database.json'



export function Bible( props ){
    const _ = props.navigation
    
    const Livre = (item, event) => {
        const [open, setOpen] = useState(true)
        const [size, setSize] = useState(20)
        const [Height, setHeight] = useState(size);
        
        const body = useRef(new Animated.Value(0)).current

        
        
        const ToggleListeItem = () => {
            console.log(open)
            if(open){
                setHeight(0)
                console.log(Height, size, body)
                Animated.timing(body, {
                    duration : 300,
                    toValue : Height,
                    useNativeDriver : false
                }).start()
            } else {
                setHeight(size)
                console.log(Height)
                Animated.timing(body, {
                    duration : 300,
                    toValue : 0,
                    useNativeDriver : false
                }).start()
            }
            setOpen(!open)
        }
        
        let Chap  
        const chap = () => {
            if(item.nbrChap < 10) {
                return Chap = '0' + item.nbrChap
            } else {
                return item.nbrChap
            }
        }

        const Map = (a) => {
            return(
                <View style = {{height : 56, width : 56, justifyContent : "center", alignItems : 'center', borderColor : 'black', borderWidth : 1, marginBottom: 10, marginRight: 9.6}}>
                    <Text>{a.key} </Text>
                </View>
            )
        } 

        return (
            <Animated.View style={{ marginBottom : 5 }}>
                <TouchableWithoutFeedback
                    onPress = {ToggleListeItem}
                >
                    <View style = {{width : '100%', alignItems : 'center', justifyContent : 'space-between', padding : 16, backgroundColor : 'white',flexDirection : "row", }}>
                        <Animated.Text style = {{fontSize : 16}}>{item.nom} </Animated.Text>
                        <Text style = {{color : 'silver'}}>Nombre de Chapitre : {chap()} </Text>
                    </View>
                </TouchableWithoutFeedback>
                <Animated.View  style={{height : body, width : '100%', backgroundColor : 'white', overflow : 'hidden'}}>
                    <View onLayout = {({nativeEvent}) => setHeight(nativeEvent.layout.height)} style = {{width: '100%', height : 20}}>
                       <View onLayout = {({nativeEvent}) => setSize(nativeEvent.layout.height)} style = {{width: '100%',  flexDirection : 'row', flexWrap : 'wrap', paddingHorizontal : 16}}>
                       {
                            item.content.map(el => Map(el))
                        }
                       </View>
                    </View>
                </Animated.View>
            </Animated.View>
        )
    }


  return (
    <SafeAreaView style = {Style.content} >
        <StatusBar barStyle = 'light-content' backgroundColor = 'white' />
      <ScrollView style={Style.scrollview}>
          {
              livre.map((el, key) => Livre(el))
          }
      </ScrollView>
    </SafeAreaView>
  );
}

export function BibleId(props) {
    const _ = props.route.params
    // console.log(_)
    return(
        <View>
            <Text>BibleID</Text>
        </View>
    )
}
