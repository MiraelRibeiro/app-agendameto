import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff'
    },
    
    btnSair:{
        alignSelf: 'center',
        position:'absolute',
        backgroundColor:'red',
        borderRadius: 50,
        paddingVertical: 8,
        width:'85%',
        alignSelf:'center',
        bottom: '5%',
        alignItems:'center',
        justifyContent:'center'
    },
});