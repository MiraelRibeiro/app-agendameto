import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex: 1,        
        backgroundColor: '#E6E8FA',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },

    containerAgendamento:{ 
        flex: 0.85,
        alignContent: 'center',
        paddingHorizontal:20, 
        paddingTop:40
    },

    input:{
        backgroundColor:'white', 
        borderRadius:15,
        borderWidth: 1,
        borderColor: 'grey',
        margin:10, 
        height:60, 
        paddingStart:10,
    },

    label:{
        alignSelf: 'center',
        color: 'white',
        paddingTop: 30, 
        paddingBottom: 20, 
        fontSize: 40,
        fontWeight: '600'    
    }, 

    selectList:{
        backgroundColor: 'white',
        borderRadius:15,
        margin:10, 
        height:65, 
        paddingStart:10,
        alignItems: 'center'
    },

    dateComponente:{
        width: 350
    },

    button:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
        marginTop: 5,
        marginBottom:30,
        marginHorizontal:20,
        backgroundColor: '#3333FF',
        height: 60,
    },
      
    textButton:{
        fontSize: 22,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    text: {
        fontSize: 25,
        color: 'red',
        padding: 3,
        marginBottom: 10,
        textAlign: 'center'
    },

    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
    },

    labelErrors:{
        alignSelf: 'flex-start',
        color: '#ff375b',
        marginBottom: 8
    },
    
})