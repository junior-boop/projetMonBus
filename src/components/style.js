import { StyleSheet } from 'react-native'
import { width } from '../const/const'

export const Style = StyleSheet.create({
    container : {
        width : width,
        paddingHorizontal : 16,
        marginBottom : 16,
    },
    // note 
    note : {
        padding : 16,
        borderRadius : 12,
        backgroundColor : 'white', 
        borderWidth : 0.5,
        borderColor : '#77777755'
    },
    Items : {
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    noteTitre : {
        fontSize : 20,
        marginBottom : 3
    },
    noteContent : {
        color : '#303030',
        marginBottom : 5
    },
    ligne : {
        height : 1,
        backgroundColor : '#aaa5',
        marginTop : 10,
        marginBottom : 10,
    },
    ref : {
        display : 'flex',
        paddingVertical: 5, paddingHorizontal : 10, marginRight : 5,
        justifyContent : 'center', alignItems : 'center',
        borderRadius : 15, backgroundColor : '#50505022', fontSize : 10
    },
    // bibleRead
    bibleRead : {
        flexDirection : 'row',
    },
    BibleContMess : {
        width : '85%',
    },
    bibleMess : {
        fontSize : 16
    },
    test : {
        flexDirection : 'row'
    },
    Read : {
        paddingVertical : 5,
        paddingHorizontal : 16,
        backgroundColor : '#64c5eb',
        marginTop : 10
    },
    // verset
    verset : {
        backgroundColor : 'white', 
        padding: 16,
        borderRadius : 12
    },
    versetText : {
        fontSize : 18, fontWeight : 'bold', color : '#e84d8a'
    },
    versetTitre : {
        fontSize : 18
    },
    versetPast : {
        paddingHorizontal : 12,
        paddingVertical : 3,
        backgroundColor : '#55555522',
        marginVertical : 5,
        fontSize : 10
    }, 
    leftGros : {fontSize : width * 0.09, textTransform : 'uppercase'},
    leftPetit : {fontWeight : 'bold'},
    rightGros : {fontSize : width * 0.09, textAlign : 'right',  textTransform : 'uppercase'},
    rightPetit : {fontWeight : 'bold', textAlign : 'right'},
    depart : {fontWeight : 'bold', color : 'silver', textAlign : 'right'},
    heure : {fontSize : width * 0.05, color : '#006bc2', textAlign : 'right'},
    itemsImages : {width : 50, height :50, marginBottom : 5, resizeMode : 'contain', borderRadius : 5},
    itemsFooter : {paddingHorizontal : 16, paddingVertical : 5, borderColor : 'silver', borderWidth : 0.5, borderRadius : 5}
})