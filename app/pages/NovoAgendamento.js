import React, {useEffect, useState} from "react";
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import DatePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import ValidarDropDown from "../functions/validations/Valid-DropDown";
import ValidarAgendamento from '../functions/validations/Valid-Agendamento';
import styles from '../styles/novoAgendamento';
import { MedicosIndex, PacientesIndex, AgendamentoPost } from "../functions/Api";

export default NovoAgendamento = () =>{

    var token = null;
    const navigation = useNavigation();

    useEffect(() => {
        const buscarMedicos = async () => {
            token = await AsyncStorage.getItem('tokenId');
            let data = await MedicosIndex(token);
            setBuscaMedico(data.setData);
        } 

        buscarMedicos();

        const buscarPacientes = async () => {
            token = await AsyncStorage.getItem('tokenId');
            let data = await PacientesIndex(token);
            setBuscaPaciente(data.setData);
        }

        buscarPacientes();
        
    },[])

    const medicos = () => {
        let dados = [];

        if(buscaMedico){
            buscaMedico.map((val) => {
                dados.push({key: val.id, value: val.nome})
            })
        }

        return dados;
    };

    const pacientes = () => {
        let dados = [];

        if(buscaPaciente){
            buscaPaciente.map((val) => {
                dados.push({key: val.id, value: val.nome})
            })
        }

        return dados;
    };

    const [selectMedico, setSelectMedico] = useState("");
    const [buscaMedico, setBuscaMedico] = useState(); 

    const [selectPaciente, setSelectPaciente] = useState("");
    const [buscaPaciente, setBuscaPaciente] = useState();    

    const [selectHora, setSelectHora] = useState("");

    const [datePicker, setDatePicker] = useState(false);
    const [stringDate, setStringDate] = useState('Escolha a data:');
 
    const [date, setDate] = useState(new Date());

    const showDatePicker = () => {
        setDatePicker(true);
    };

    const onDateSelected = (event, value) => {
        setDate(value);
        setStringDate(date.toDateString());
        setDatePicker(false);
    };
    
    // fazer a validação dos campos
    async function salvarAgendamento(){
        
        let dataAgendamento = null;
        let hora = null;
        let medicoId = null;
        let pacienteId = null;        
        let medicoNome = null;
        let pacienteNome = null;

        token = await AsyncStorage.getItem('tokenId');

        let mensagem = ValidarAgendamento(selectMedico, selectPaciente, stringDate, selectHora);

        if(mensagem){
            alert(mensagem)
        }
        else{
            try{
                dataAgendamento = moment(new Date(stringDate)).format('YYYY-MM-DD');
                hora = selectHora;
                medicoNome = selectMedico;
                pacienteNome = selectPaciente;
    
                buscaPaciente.map((val)=>{
                    if(val.nome === selectPaciente){
                        pacienteId = val.id
                    }
                })
    
                buscaMedico.map((val)=>{
                    if(val.nome === selectMedico){
                        medicoId = val.id
                    }
                })
                
                let retorno = await AgendamentoPost(token, dataAgendamento, hora, parseInt(medicoId), parseInt(pacienteId), String(medicoNome).trim(), String(pacienteNome).trim());

                if(retorno.status === 200)
                {
                    alert("Agendamento salvo com sucesso!");
                    navigation.navigate("Agendamentos");
                }
                else{
                    alert("Erro ao cadastrar agendamento, confira os dados e tente novamente1")
                }
                
            }
            catch(err){
                console.log(err);  
            }
        }
    }

    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height" } keyboardVerticalOffset={85} style={styles.container}>
            <ScrollView>
                <View style={{height: 100, backgroundColor: '#3333FF', flex: 0.15}}>
                    <Text style={styles.label}>Agendamento +</Text>
                </View>

                <View style={styles.containerAgendamento}>
                    <SelectList 
                        boxStyles={styles.selectList}
                        setSelected={(val) => setSelectMedico(val)} 
                        data={medicos} 
                        save="value"
                        placeholder="Escolha o Médico: "
                        search={false}
                    />
                    {<ValidarDropDown message="Escolha um médico disponivel" value={selectMedico}/>}                

                    <SelectList 
                        boxStyles={styles.selectList}
                        setSelected={(val) => setSelectPaciente(val)} 
                        data={pacientes} 
                        save="value"
                        placeholder="Escolha o Paciente: "
                        search={false}
                    />    
                    {<ValidarDropDown message="Escolha o nome do paciente" value={selectPaciente}/>}            

                    <SafeAreaView style={{}}>
                        
                        {datePicker && (
                        <DatePicker
                            dateFormat="day month year" 
                            value={date}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={onDateSelected}
                            style={styles.datePicker}
                        />
                        )}                    

                        {!datePicker && (                            
                            <TouchableOpacity style={{...styles.input, flexDirection: 'row', justifyContent:'center', alignItems:'center', paddingEnd:10}} onPress={showDatePicker}>
                                <Text style={{flex:1}}>{moment(new Date(stringDate)).format('DD/MM/YYYY')}</Text>
                                <FontAwesome5 name="calendar-alt" size={24} color="black" padding={10}/>
                            </TouchableOpacity>                            
                        )}      
            
                        
                    </SafeAreaView>
                    {<ValidarDropDown message="Escolha um dia disponivel" value={date.toDateString()}/>}                   

                    <TextInput style={styles.selectList}  onChangeText={(text) => setSelectHora(text)}/>

                    {<ValidarDropDown message="Escolha um horário" value={selectHora}/>}
                    
                </View>
            
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={()=> salvarAgendamento()}>
                <Text style={styles.textButton}>Confirmar Agendamento</Text>
            </TouchableOpacity>
            
        </KeyboardAvoidingView>
    )
}

