import React, {useEffect} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";

import styles from '../styles/home';

export default Home = () => {

    const navigation = useNavigation();

    function autenticarUsuario(){
        try{
            const user = null;
            
            if(user){             
                if(valor){                
                    navigation.navigate('Principal');
                }
                else{                
                    navigation.navigate('Login');
                }
            }
            else{                
                navigation.navigate('Login');
            }
            
        }
        catch(error){
            console.log(error)
        }

    }

    return(
        <View style={styles.container}>
            <View style={styles.containerImage}>
                <Animatable.Image delay={300} animation='flipInY' source={require('../src/img-saude2.png') } style={{width:'100%', height:350}} resizeMode='contain' />
            </View>
            <Animatable.View delay={800} animation='fadeInUp' style={styles.containerBemVindo}>
                <Text style={styles.textBemVindo}>Acesse e monitore seus agendamentos</Text>
                <Text style={{color:'#a1a1a1', paddingBottom:15}}>Clique no botão para acessar</Text>

                <TouchableOpacity style={styles.button} onPress={ () => autenticarUsuario()}>
                    <Text style={styles.btnText}>Acessar</Text>                    
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}