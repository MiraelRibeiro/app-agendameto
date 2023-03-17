import React, { useState } from "react";
import { View, TextInput, Text, ScrollView, DatePickerIOSBase, TouchableOpacity } from "react-native";
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from '../styles/cadastro';
import ValidarCadastro from "../functions/validations/Valid-Cadastro";
import ValidarDropDown from "../functions/validations/Valid-DropDown";

export default Cadastro = () =>{

    var token = null;


    const [selectUser, setSelectUser] = useState("");

    const usuario = [
        {key:'1', value:'Paciente'},
        {key:'2', value:'Médico'},
    ]

    const [selected, setSelected] = useState("");

    const convenio = [
        {key:'1', value:'Sim'},
        {key:'2', value:'Não'},
    ]

    const [selectDia, setSelectDia] = useState("");

    const diasSemana = [
        {key:'1', value:'Domingo'},
        {key:'2', value:'Segunda'},
        {key:'3', value:'Terça'},
        {key:'4', value:'Quarta'},
        {key:'5', value:'Quinta'},
        {key:'6', value:'Sexta'},
        {key:'7', value:'Sabado'}
    ]

    function getUser(){
        
        if(selectUser == "Paciente"){
            return (
                <View>
                    <SelectList 
                        boxStyles={styles.selectList}
                        setSelected={(val) => setSelected(val)} 
                        data={convenio} 
                        save="value"
                        placeholder="Possui convênio?"
                    />
                    <ValidarDropDown value={selected} message={'Escolha uma opção'} />
                </View>
            );
        }

        if(selectUser == "Médico"){
            return (
                <View>
                    <Controller
                        control={control}
                        name='specialization'
                        render={({ field: {onChange, value } }) => (                            
                            <TextInput style={styles.Input} placeholder="Especialização:" onChangeText={onChange} defaultValue={value} />
                        )}
                    />
                    {errors.specialization && <Text style={styles.labelErrors}>{errors.specialization?.message}</Text>} 
                    

                    <MultipleSelectList 
                        boxStyles={styles.selectList}
                        setSelected={(val) => setSelectDia(val)} 
                        data={diasSemana} 
                        save="value"
                        placeholder="Dias para atendimento:"
                        label="Dias de atendimento"
                    />
                    <ValidarDropDown value={selectDia} message={'Escolha ao menos um dia'} />

                    <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'column'}}>
                            <Controller
                                control={control}
                                name='start'
                                render={({ field: {onChange, value } }) => (                            
                                    <TextInput style={{...styles.Input, flex:1, width:180}} placeholder="Hora início:" onChangeText={onChange} defaultValue={value} />
                                )}
                            />
                            {errors.start && <Text style={styles.labelErrors}>{errors.start?.message}</Text>} 
                        </View>
                        
                        <View style={{flexDirection: 'column', paddingStart: 10}}>
                            <Controller
                                control={control}
                                name='end'
                                render={({ field: {onChange, value } }) => (                            
                                    <TextInput style={{...styles.Input, flex:1, width:180}} placeholder="Hora fim:" onChangeText={onChange} defaultValue={value} />
                                )}
                            />
                            {errors.end && <Text style={styles.labelErrors}>{errors.end?.message}</Text>}
                        </View>                        
                        
                    </View>

                    <Controller
                        control={control}
                        name='time'
                        render={({ field: {onChange, value } }) => (                            
                            <TextInput style={styles.Input} placeholder="Tempo de consulta:" onChangeText={onChange} defaultValue={value} />
                        )}
                    />
                    {errors.time && <Text style={styles.labelErrors}>{errors.time?.message}</Text>} 
                    

                    <Controller
                        control={control}
                        name='password'
                        render={({ field: {onChange, value } }) => (                            
                            <TextInput style={styles.Input} placeholder="Senha:" onChangeText={onChange} defaultValue={value} />
                        )}
                    />
                    {errors.password && <Text style={styles.labelErrors}>{errors.password?.message}</Text>} 
                    

                    <Controller
                        control={control}
                        name='confPassword'
                        render={({ field: {onChange, value } }) => (                            
                            <TextInput style={styles.Input} placeholder="Conf. Senha:" onChangeText={onChange} defaultValue={value} />
                        )}
                    />
                    {errors.confPassword && <Text style={styles.labelErrors}>{errors.confPassword?.message}</Text>} 
                    
                </View>                
                );
        }
    }

    function getConvenio(){
        if(selected === "Sim" && selectUser == "Paciente"){
            return <View>
                    <Controller
                        control={control}
                        name='convenio'
                        render={({ field: {onChange, value } }) => (                            
                            <TextInput style={styles.Input} placeholder="Nome do Convênio:" onChangeText={onChange} defaultValue={value} />
                        )}
                    />
                    {errors.convenio && <Text style={styles.labelErrors}>{errors.convenio?.message}</Text>}
                </View>
        }
    }

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(ValidarCadastro)
    });

    async function salvarCadastro(dados){
        try{
            token = await AsyncStorage.getItem('tokenId');
            console.log(token);
            console.log(dados);
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <View style={styles.container}>
            <View style={{backgroundColor: '#3333FF'}}>
                <Text style={styles.label}>Novo Cadastro</Text>
            </View>

            <ScrollView style={styles.dados}>                             
                <Controller
                    control={control}
                    name='nome'
                    render={({ field: {onChange, value } }) => (                            
                        <TextInput style={styles.Input} placeholder='Nome Completo:' onChangeText={onChange} value={value} defaultValue={value} />
                    )}
                />
                {errors.name && <Text style={styles.labelErrors}>{errors.name?.message}</Text>}
                

                <Controller
                    control={control}
                    name='cpf'
                    render={({ field: {onChange, value } }) => (                            
                        <TextInput style={styles.Input} placeholder='CPF:' keyboardType="numeric" onChangeText={onChange} defaultValue={value} />
                    )}
                />
                {errors.cpf && <Text style={styles.labelErrors}>{errors.cpf?.message}</Text>}
                

                <Controller
                    control={control}
                    name='birth'
                    render={({ field: {onChange, value } }) => (                            
                        <TextInput style={styles.Input} placeholder='Nascimento:' onChangeText={onChange} defaultValue={value} />
                    )}
                />
                {errors.birth && <Text style={styles.labelErrors}>{errors.birth?.message}</Text>}
                

                <SelectList 
                    boxStyles={styles.selectList}
                    setSelected={(val) => setSelectUser(val)} 
                    data={usuario} 
                    save="value"
                    placeholder="Tipo de cadastro:"
                />
                <ValidarDropDown value={selectUser} message={'Escolha uma das opções'} />

                {getUser()}

                {getConvenio()}

                <Controller
                    control={control}
                    name='email'
                    render={({ field: {onChange, value } }) => (                            
                        <TextInput style={styles.Input} placeholder='E-mail:' onChangeText={onChange} defaultValue={value} />
                    )}
                />
                {errors.email && <Text style={styles.labelErrors}>{errors.email?.message}</Text>}
                

                <Controller
                    control={control}
                    name='phone'
                    render={({ field: {onChange, value } }) => (                            
                        <TextInput style={styles.Input} placeholder='Telefone / Whatsapp:' onChangeText={onChange} defaultValue={value} />
                    )}
                />
                {errors.phone && <Text style={styles.labelErrors}>{errors.phone?.message}</Text>}
                

                <Controller
                    control={control}
                    name='cep'
                    render={({ field: {onChange, value } }) => (                            
                        <TextInput style={styles.Input} placeholder='Cep:' onChangeText={onChange} defaultValue={value} />
                    )}
                />
                {errors.cep && <Text style={styles.labelErrors}>{errors.cep?.message}</Text>}
                

                <Controller
                    control={control}
                    name='street'
                    render={({ field: {onChange, value } }) => (                            
                        <TextInput style={styles.Input} placeholder='Rua:' onChangeText={onChange} defaultValue={value} />
                    )}
                />
                {errors.street && <Text style={styles.labelErrors}>{errors.street?.message}</Text>}
                

                <Controller
                    control={control}
                    name='neighborhood'
                    render={({ field: {onChange, value } }) => (                            
                        <TextInput style={styles.Input} placeholder='Bairro:' onChangeText={onChange} defaultValue={value} />
                    )}
                />
                {errors.neighborhood && <Text style={styles.labelErrors}>{errors.neighborhood?.message}</Text>}
                

                <Controller
                    control={control}
                    name='city'
                    render={({ field: {onChange, value } }) => (                            
                        <TextInput style={styles.Input} placeholder='Cidade:' onChangeText={onChange} defaultValue={value} />
                    )}
                />
                {errors.city && <Text style={styles.labelErrors}>{errors.city?.message}</Text>}
                

                <Controller
                    control={control}
                    name='uf'
                    render={({ field: {onChange, value } }) => (                            
                        <TextInput style={styles.Input} placeholder='UF:' onChangeText={onChange} defaultValue={value} />
                    )}
                />
                {errors.uf && <Text style={styles.labelErrors}>{errors.uf?.message}</Text>}
                

                <Controller
                    control={control}
                    name='country'
                    render={({ field: {onChange, value } }) => (                            
                        <TextInput style={{...styles.Input, marginBottom: 20}} placeholder='País:' onChangeText={onChange} defaultValue={value} />
                    )}
                />
                {errors.country && <Text style={styles.labelErrors}>{errors.country?.message}</Text>}
                

            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(salvarCadastro)}>
                <Text style={styles.textButton}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}

