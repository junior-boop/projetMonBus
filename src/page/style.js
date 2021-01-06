import {StyleSheet} from 'react-native'
import {width} from '../const/const'

export const Style = StyleSheet.create({
    content : {
        flex : 1,
      },
      scrollview : {
        width : width,
        backgroundColor : 'white',
      },
      head : {
          backgroundColor : 'white',
          marginBottom : 16
      },
      header : {
          width : '100%',
          padding: 16,
      },
      headerTitle : {
          fontSize : 24,
          fontWeight : 'bold',
          color : "#000000aa"
      },
      container : {
          width : width, 
          paddingLeft: 16, paddingRight : 16,
          marginBottom : 16, 
      }, 
      infos : {
          width : '100%',
          padding: 16,
          borderRadius : 10,
          backgroundColor : '#64c5eb'
      },
      infosTitle : {
          marginBottom : 10,

      },
      addNote : {
          position : 'absolute',
          bottom : 16,
          right : 16,
          display : 'flex',
          width : 60,
          height : 60,
          borderRadius : 35,
          justifyContent : 'center',
          alignItems : 'center',
          backgroundColor : '#e84d8a',
          elevation : 10
      },
      //verset

      vers : {
          paddingHorizontal : 16,
          paddingVertical : 5
      },
      versTitre : {
          fontSize : 20,
          fontWeight : "bold",
         padding: 0,
         marginBottom : 16
      }
})