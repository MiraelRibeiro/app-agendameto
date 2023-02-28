import { StyleSheet} from "react-native";

export default StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        backgroundColor: '#E6E8FA',
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

    button:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
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

    input:{
        backgroundColor:'white', 
        borderRadius:15,
        borderWidth: 2,
        borderColor: '#3333FF',
        margin:5, 
        height:45, 
        paddingStart:10,
    },

    iconPerson:{
        justifyContent: 'center',
        height: 150,
        width: 150,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 20
    },

    labelErrors:{
        alignSelf: 'flex-start',
        color: '#ff375b',
        marginBottom: 8
    }
})