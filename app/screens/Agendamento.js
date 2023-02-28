import React, {useState} from "react";
import { View, Text, ScrollView } from "react-native";
import styles from '../styles/agendamento';

export default Agendamento = () =>{
    
    const [agendamentos, setAgendamenos] = useState([
        {
            id: 1,
            paciente: 'Fulano 1',
            medico: 'medico 1',
            data: '20/12/2022',
            hora: '13:00'
        },

        {
            id: 2,
            paciente: 'Fulano 2',
            medico: 'medico 2',
            data: '10/12/2022',
            hora: '14:00'
        },

        {
            id: 3,
            paciente: 'Fulano 3',
            medico: 'medico 2',
            data: '09/12/2022',
            hora: '10:00'
        },

        {
            id: 4,
            paciente: 'Fulano 1',
            medico: 'medico 1',
            data: '10/12/2022',
            hora: '15:00'
        },

        {
            id: 5,
            paciente: 'Fulano 5',
            medico: 'medico 1',
            data: '12/12/2022',
            hora: '11:00'
        },

        {
            id: 6,
            paciente: 'Fulano 6',
            medico: 'medico 3',
            data: '10/12/2022',
            hora: '14:00'
        },
    ]);
    
    //receber uma lista de agendamentos contendo listas de agendamentos para cada dia (lista de lista)
    return(
        <ScrollView style={styles.container}>            
            {agendamentos.map(function(val){
                    return(
                        <View style={styles.componente}>
                            <View style={styles.circle}>
                                <Text style={{color: 'white', fontSize:22, fontWeight:'800'}}>{val.data.substring(0,5)}</Text>
                            </View>
                            <View >
                                <Text style={{fontSize:22, fontWeight:'600', color: '#2f2e2e'}} >{val.paciente}</Text>
                                <Text style={{fontSize:15, fontWeight:'400', color: '#808085'}} >{val.medico}</Text>
                                <Text style={{fontSize:16, fontWeight:'500', color: '#7858F2'}} >{val.hora}</Text>
                            </View>             
                        </View>
                    )      
            })}           
        </ScrollView>
    )
}