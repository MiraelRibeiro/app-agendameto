import React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import ValidarLogin from "../functions/validations/Valid-Login";
import styles from '../styles/login';
import { useState } from 'react';
import api from "../services/api";

export default Login = () => {
    
    const navigation = useNavigation();
    const [userData, setData] = useState("");
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(ValidarLogin)
    });

    
    async function iniciarLogin (dados){   
        setLoading(true);
        try{   
            await api.post('sessions', {
                user_name: String(dados.user).trim(),
                password: String(dados.password).trim()
            })
                .then(({data}) => {
                setLoading(false)
                setData(data)
            });
            
            if(!loading){
                if(userData){
                    console.log(userData);
                    let token = userData.token;
                    await AsyncStorage.setItem('tokenId', token);
                    await AsyncStorage.setItem('userData', JSON.stringify(userData));
                    navigation.navigate('Principal');
                }
            }
            
        }
        catch(err){ 
            setLoading(false);
            setError(err);
            console.log(error); 
        }
        
    }

    return(
        <View style={styles.container}>
            <View style={{height:'22%', width: '100%', marginBottom: 20}}>
                <View style={{flexDirection: 'row', ...styles.Input}}>
                    <FontAwesome5 name="user-nurse"  size={30} color="#C0C0C0" /> 
                    <Controller
                        control={control}
                        name='user'
                        render={({ field: {onChange, value } }) => (
                            <TextInput placeholderTextColor={'white'} style={{marginStart: 10, flex:1}} color={'white'} placeholder="Usuário:" onChangeText={onChange} defaultValue={value} />
                        )}
                    />
                    {errors.user && <Text style={styles.labelErrors}>{errors.user?.message}</Text>}                   
                    
                </View>
                <View style={{flexDirection: 'row', ...styles.Input}}>
                    <FontAwesome5 name="unlock-alt" size={30} color="#C0C0C0" />
                    <Controller
                        control={control}
                        name='password'
                        render={({ field: {onChange, value } }) => (
                            <TextInput placeholderTextColor={'white'} style={{marginStart: 10, flex:1}} color={'white'} secureTextEntry={true} placeholder="Senha:" onChangeText={onChange} defaultValue={value} />
                        )}
                    />
                    {errors.password && <Text style={styles.labelErrors}>{errors.password?.message}</Text>} 
                    
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(iniciarLogin)}>
                {!loading ? (<Text style={styles.textButton}>Entrar</Text>) : (<ActivityIndicator color={'fff'} size="large"/>) }
            </TouchableOpacity>

        </View>
    );
}