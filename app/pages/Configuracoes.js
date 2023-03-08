import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from '../styles/configuracoes';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default Configuracoes = () => {
    const navigation = useNavigation();

    function SairConta (){

        Alert.alert(
            'Sair',
            'Deseja encerrar a sessão?',
            [
            { text: 'Sim', onPress: async () => { 
                try{
                    await AsyncStorage.clear();
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