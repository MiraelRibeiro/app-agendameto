import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from '../styles/configuracoes';


export default Configuracoes = () => {
    const navigation = useNavigation();

    function SairConta (){

        Alert.alert(
            'Sair',
            'Deseja encerrar a sessão?',
            [
            { text: 'Sim', onPress: () => { 
                try{
                    navigation.navigate('Home');
                }
                catch(error){
                    console.log(error);
                }
            } },
            {
                text: 'Não',
                onPress: () => console.log('No Pressed'),
                style: 'cancel',
            },
            ],
            { cancelable: false }
        );
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnSair} onPress={() => SairConta()}>
                <Text style={{color:'white', alignSelf:'center', fontSize: 18, fontWeight: 'bold'}}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}