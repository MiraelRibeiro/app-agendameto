import React from "react";
import { StyleSheet, Text } from "react-native";


export default ValidarCadastroAdmin = (props) => {
    
    if(props.value == null || props.value == ''){
        return<Text style={styles.labelErrors}>{props.message}!</Text>
    }
    
}

const styles = StyleSheet.create({
    
    labelErrors:{
        alignSelf: 'flex-start',
        color: '#ff375b',
        marginBottom: 8
    }
})