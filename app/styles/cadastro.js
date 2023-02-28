import { StyleSheet} from "react-native";

export default StyleSheet.create({
    container:{    
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#E6E8FA',
    },

    dados:{
        flexDirection:'column',
        padding:10,        
    },

    Input:{
        backgroundColor:'white', 
        borderRadius:15,
        borderWidth: 2,
        borderColor: '#3333FF',
        margin:5, 
        height:45, 
        paddingStart:10,
    },

    label:{
        alignSelf: 'center',
        color: 'white',
        paddingTop: 30, 
        paddingBottom: 30, 
        fontSize: 40,
        fontWeight: '600'     
    }, 

    button:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
        marginVertical:20,
        marginHorizontal:15,
        backgroundColor: '#3333FF',
    },
      
    textButton:{
        fontSize: 22,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    selectList:{
        backgroundColor: 'white',
        borderRadius:15,
        margin:5, 
        height:45, 
        paddingStart:10,
        borderColor: "#3333FF",
        borderWidth: 2
    },

    labelErrors:{
        alignSelf: 'flex-start',
        color: '#ff375b',
        marginBottom: 8
    },
})