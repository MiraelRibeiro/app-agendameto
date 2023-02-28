import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#3333FF'
    },

    containerImage:{
        flex:2,
        margin:20,
        justifyContent:'center',
        alignItems:'center'
    },

    containerBemVindo:{
        flex:1,
        marginLeft:10, 
        marginRight: 10,
        backgroundColor:'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart:'5%',
        paddingEnd:'5%',
        paddingTop: 10,
        alignItems:'center'
    },

    textBemVindo:{
        color:'black',
        fontSize:25,
        fontWeight:'bold',
        marginTop:10,
        marginBottom:20
    },

    button:{
        position:'absolute',
        backgroundColor:'#3333FF',
        borderRadius: 50,
        paddingVertical: 8,
        width:'60%',
        alignSelf:'center',
        bottom: '15%',
        alignItems:'center',
        justifyContent:'center'
    },

    btnText:{
        color:'white',
        fontSize:18,
        fontWeight:'bold'
    },
});