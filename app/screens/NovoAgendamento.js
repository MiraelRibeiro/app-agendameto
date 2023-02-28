import React, {useState} from "react";
import { View, Text, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import DatePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import ValidarDropDown from "../functions/validations/Valid-DropDown";
import ValidarAgendamento from '../functions/validations/Valid-Agendamento';
import styles from '../styles/novoAgendamento';

export default NovoAgendamento = () =>{

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(ValidarAgendamento)
    });

    function validaAgendamento(data){
        console.log(data)
    }

    // pesquisar como mostrar a data no formato PT-BR
    const [selectDia, setSelectDia] = useState("");

    const [selectMedico, setSelectMedico] = useState("");

    const data = [
        {key:'1', value:'Médico 1'},
        {key:'2', value:'Médico 2'},
        {key:'3', value:'Médico 3'},
        {key:'4', value:'Médico 4'},
        {key:'5', value:'Médico 5'},
        {key:'6', value:'Médico 6'},
        {key:'7', value:'Médico 7'},
    ]

    const [selectHora, setSelectHora] = useState("");

    const hora = [
        {key:'1', value:'09:00'},
        {key:'2', value:'10:00'},
        {key:'3', value:'11:00'},
        {key:'4', value:'12:00'},
        {key:'5', value:'14:00'},
        {key:'6', value:'15:00'},
        {key:'7', value:'16:00'},
        {key:'8', value:'17:00'},
    ]

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

    return(
        <View style={styles.container}>
             <View style={{height: 100, backgroundColor: '#3333FF', flex: 0.15}}>
                <Text style={styles.label}>Agendamento +</Text>
             </View>

            <View style={styles.containerAgendamento}>
                <SelectList 
                    boxStyles={styles.selectList}
                    setSelected={(val) => setSelectMedico(val)} 
                    data={data} 
                    save="value"
                    placeholder="Escolha o Médico: "
                />
                {<ValidarDropDown message="Escolha um médico disponivel" value={selectMedico}/>}

                <Controller
                    control={control}
                    name='paciente'
                    render={({ field: {onChange, value } }) => (                            
                        <TextInput style={styles.input} placeholderTextColor='black' placeholder='Paciente:' onChangeText={onChange} defaultValue={value}/>
                    )}
                />
                {errors.paciente && <Text style={styles.labelErrors}>{errors.paciente?.message}</Text>}                 

                <SafeAreaView style={{}}>
                    
                    {datePicker && (
                    <DatePicker
                        dateFormat="dd/MM/yyyy" 
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
                            <Text style={{flex:1}}>{stringDate}</Text>
                            <FontAwesome5 name="calendar-alt" size={24} color="black" padding={10}/>
                        </TouchableOpacity>
                    )}                    
                    
                </SafeAreaView>
                {<ValidarDropDown message="Escolha um dia disponivel" value={date.toDateString()}/>}

                <SelectList 
                    boxStyles={styles.selectList}
                    setSelected={(val) => setSelectHora(val)} 
                    data={hora} 
                    save="value"
                    placeholder="Escolha o Horário: "
                />
                {<ValidarDropDown message="Escolha um horário disponivel" value={selectHora}/>}
                
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(validaAgendamento())}>
                <Text style={styles.textButton}>Confirmar Agendamento</Text>
            </TouchableOpacity>
        </View>
    )
}

