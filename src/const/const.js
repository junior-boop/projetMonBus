import {Dimensions} from 'react-native'
import { useState } from 'react';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

export const width = Dimensions.get('screen').width

export let liste = []

export const check = async () => {
    let DATA = []

    let data =  await AsyncStorage.getItem('Ticket')

    if(!data){
        await AsyncStorage.setItem('Ticket', JSON.stringify(DATA), (err) => console.log(err) )
    }
}; 