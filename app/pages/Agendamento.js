import React, {useEffect, useState} from "react";
import { View, Text, ScrollView, SafeAreaView, TextInput } from "react-native";
import moment from "moment/moment";
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../styles/agendamento";
import { AgendamentosIndex } from "../functions/Api";

export default Agendamento = () =>{

    var token = null
    var userData = null;
     
    const [agendamentos, setAgendamentos] = useState([]);
    const [pesquisa, setPesquisa] = useState("");

    useEffect(() => {

        const getStore = async () =>{
            token = await AsyncStorage.getItem('tokenId');
            userData = JSON.parse(await AsyncStorage.getItem('userData'));

            let data = await AgendamentosIndex(token, userData)

            setAgendamentos(data.setData);            
        }
        getStore();
    }, []);

    
    return(
        <SafeAreaView style={{flex:1, backgroundColor: '#E6E8FA', paddingTop:10 }}>
            <View style={{flexDirection: 'row', position: 'relative', ...styles.Input}} >                
                <TextInput placeholderTextColor={'black'} style={{marginStart: 10, flex: 1}} color={'black'}  placeholder="Pesquisar:" onChangeText={setPesquisa} />      
                <FontAwesome name="search" size={30} color="black" />            
            </View>
            <ScrollView style={{...styles.container }}>         
                {agendamentos.filter(function(item){
                    if(pesquisa === ""){
                        return item;
                    }
                    else if(item.pacienteNome.toLowerCase().includes(pesquisa.toLowerCase()) || item.medicoNome.toLowerCase().includes(pesquisa.toLowerCase())){
                        return item;
                    }
                }).map(function(val){
                    
                        return(
                            <View key={val.id} style={styles.componente}>                            
                                <View style={styles.circle}>
                                    <Text style={{color: 'white', fontSize:22, fontWeight:'800'}}>{moment(val.data).format('DD/MM/YYYY').substring(0,5)}</Text>
                                </View>
                                <View >
                                    <Text style={{fontSize:22, fontWeight:'600', color: '#2f2e2e'}} >{val.pacienteNome}</Text>
                                    <Text style={{fontSize:15, fontWeight:'400', color: '#808085'}} >{val.medicoNome}</Text>
                                    <Text style={{fontSize:16, fontWeight:'500', color: '#7858F2'}} >{val.hora}</Text>
                                </View>             
                            </View>
                        )      
                })}           
            </ScrollView>
        </SafeAreaView>
    )
}