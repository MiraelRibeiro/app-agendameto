import { StyleSheet} from "react-native";

export default StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3333FF',
        padding: 20
    },

    Input:{        
        backgroundColor:'transparent', 
        borderBottomWidth: 2,
        borderColor: 'white',
        margin:15, 
        height:50, 
        paddingStart:10,
    },

    button:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
        marginVertical:30,
        backgroundColor: '#ffffff',
        width: '92%',
        height: 50
    },
      
    textButton:{
        fontSize: 22,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#3333FF',
    },

    labelErrors:{
        alignSelf: 'flex-start',
        color: '#ff375b',
        marginBottom: 8
    }

});