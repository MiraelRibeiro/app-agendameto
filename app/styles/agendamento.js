import { StyleSheet} from "react-native";

export default StyleSheet.create({
    container:{
        flex: 1,        
        backgroundColor: '#E6E8FA',
        paddingTop: 20
    },

    componente:{
        backgroundColor: 'white',
        paddingStart:10,
        paddingBottom:10,
        paddingTop:10,
        margin:10,
        borderWidth:2, 
        borderRadius: 15,
        borderColor: '#3333FF',
        flexDirection: 'row'
    },

    circle: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        backgroundColor: "#3333FF",        
        marginEnd: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
})