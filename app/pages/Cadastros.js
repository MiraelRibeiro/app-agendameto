import React, { useRef, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInputMask } from "react-native-masked-text"
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import { MedicosPost, PacientesPost, UserPost } from "../functions/Api";
import styles from '../styles/cadastro';
import ValidarCadastro from "../functions/validations/Valid-Cadastro";
import ValidarCadastroM from "../functions/validations/Valid-CadastroM";
import ValidarDropDown from "../functions/validations/Valid-DropDown";

export default function Cadastros() {

    var token = null;

    var cpfRef = useRef(null);
    var nascRef = useRef(null);
    var numRef = useRef(null);
    var cepRef = useRef(null);
    var cpf = null;
    var telefone = null;
    var nascimento = null;
    var cep =  null;
    const navigation = useNavigation();

    function retirarMascara(){
        cpf = cpfRef?.current.getRawValue();
        telefone = numRef?.current.getRawValue();
        nascimento = moment(nascRef?.current.getRawValue()).format('DD/MM/YYYY');
        cep = String(cepRef?.current.getRawValue()).replace(/\./g, "");
        console.log(cpf);
        console.log(cep);
        console.log(telefone);
        console.log(nascimento);
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues:{
            bairro:"",
            cep:"",
            cidade:"",
            confPassword:"",
            convenio:"",
            cpf:"",
            email:"",
            especializacao:"",
            fim:"",
            inicio:"",
            nascimento:"",
            nome:"",
            password:"",
            phone:"",
            rua:"",
            time:"",
            uf:"",
            username: ""
        },
        resolver: yupResolver(selectUser == "Médico" ? ValidarCadastroM : ValidarCadastro)
    });

    function limparDados(){
        setSelectUser("");
        setSelectDia("");
        setSelected("");        
        cpf = null;
        telefone = null;
        nascimento = null;
        cep =  null;
    }

    
    const onSubmit = async (data) => {
        token = await AsyncStorage.getItem('tokenId');

        retirarMascara();

        try{            
            if(selectUser == "Médico"){      

                let diasAtend = "";

                selectDia.forEach(dia => {
                    diasAtend += `${dia}-`
                });   

                let setData = await MedicosPost(token, String(data.nome).trim(), String(cpf).trim(), nascimento, String(data.email).trim(), telefone,
                    String(data.especializacao).trim(), diasAtend.trimEnd('-'), data.inicio, data.fim, data.time, cep, String(data.rua).trim(), String(data.bairro).trim(),
                    String(data.cidade).trim(), data.uf);

                if(setData.status === 200){
                    let newUser = null;

                    newUser = await UserPost(token, String(data.nome).trim(), String(data.username).trim(), "medico", setData.id, String(data.password).trim());
                    if(newUser.status == 400){
                        alert("Dados de usuário já cadastrados, verifique-os e tente novamente!");
                    }else if(newUser.status === 200){
                        alert("Dados salvos com sucesso!");
                        setSelectUser("");
                        setSelectDia("");
                        reset();
                    }
                }
                
            }
            else{
                let temConvenio = false;

                if(selected === "Sim"){
                    temConvenio = true;
                }
                
                let setData = await PacientesPost(token, String(data.nome).trim(), String(cpf).trim(), nascimento, String(data.email).trim(), telefone, 
                    temConvenio, String(data.convenio).trim(), cep, String(data.rua).trim(), String(data.bairro).trim(), String(data.cidade).trim(), data.uf);
                                
                if(setData.status === 400){
                    alert("Dados de paciente já cadastrados, verifique-os e tente novamente!");
                }
                else if(setData.status === 200){
                    alert("Dados salvos com sucesso!");
                    limparDados();
                    reset();
                    navigation.navigate("Agendamentos");
                }
            }            
        
            
        }
        catch(err){
            console.log(err)
        }
    }

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
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.Input}
                            placeholder='Especialização:'
                            onChangeText={onChange}
                            value={value}
                        />
                        )}
                        name="especializacao"
                    />
                    {errors.especializacao && <Text style={styles.labelErrors}>{errors.especializacao?.message}</Text>}                     

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
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInputMask 
                                        style={{...styles.Input, flex:1, width:180}}
                                        type={'custom'}
                                        options={{                            
                                            mask: '99:99'
                                        }}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder='Hora Início:'
                                        keyboardType="numeric"
                                    />
                                )}
                                name="inicio"
                            />
                            {errors.inicio && <Text style={styles.labelErrors}>{errors.inicio?.message}</Text>} 
                        </View>
                        
                        <View style={{flexDirection: 'column', paddingStart: 10}}>
                            <Controller
                                control={control}                        
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInputMask 
                                        style={{...styles.Input, flex:1, width:180}}
                                        type={'custom'}
                                        options={{                            
                                            mask: '99:99'
                                        }}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder='Hora Fim:'
                                        keyboardType="numeric"
                                    />
                                )}
                                name="fim"
                            />
                            {errors.fim && <Text style={styles.labelErrors}>{errors.fim?.message}</Text>}
                        </View>                        
                        
                    </View>

                    <Controller
                        control={control}                        
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInputMask 
                                style={styles.Input}
                                type={'custom'}
                                options={{                            
                                    mask: '99:99'
                                }}
                                onChangeText={onChange}
                                value={value}
                                placeholder='Tempo de consulta:'
                                keyboardType="numeric"
                            />
                        )}
                        name="time"
                    />
                    {errors.time && <Text style={styles.labelErrors}>{errors.time?.message}</Text>} 
                    
                    <Controller
                        control={control}                        
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.Input}
                            placeholder="User Name:"
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize='none'
                        />
                        )}
                        name="username"
                    /> 
                    {errors.username && <Text style={styles.labelErrors}>{errors.username?.message}</Text>} 

                    <Controller
                        control={control}                        
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.Input}
                            placeholder="Senha:"
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry={true}
                        />
                        )}
                        name="password"
                    />                    
                    {errors.password && <Text style={styles.labelErrors}>{errors.password?.message}</Text>} 
                    

                    <Controller
                        control={control}                        
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.Input}
                            placeholder="Conf. Senha:"
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry={true}
                        />
                        )}
                        name="confPassword"
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
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.Input}
                            placeholder="Nome do Convênio:"
                            onChangeText={onChange}
                            value={value}
                        />
                        )}
                        name="convenio"
                    />
                    {errors.convenio && <Text style={styles.labelErrors}>{errors.convenio?.message}</Text>}
                </View>
        }
    }

  return (
    <View style={styles.container}>
        <View style={{backgroundColor: '#3333FF'}}>
            <Text style={styles.label}>Novo Cadastro</Text>
        </View>
        <ScrollView style={styles.dados}>
            
            <Controller
                control={control}                
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.Input}
                    placeholder='Nome Completo:'
                    onChangeText={onChange}
                    value={value}                    
                />
                )}
                name="nome"
            />
            {errors.nome && <Text style={styles.labelErrors}>{errors.nome?.message}</Text>}

            <Controller
                control={control}                
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputMask 
                        style={styles.Input}
                        type="cpf"
                        mask="xxx.xxx.xxx-xx"
                        onChangeText={onChange}
                        value={value}
                        placeholder='CPF:'
                        keyboardType="numeric"
                        ref={cpfRef}
                    />
                )}
                name="cpf"
            />
            {errors.cpf && <Text style={styles.labelErrors}>{errors.cpf?.message}</Text>}

            <Controller
                control={control}                
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputMask 
                        style={styles.Input}
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        onChangeText={onChange}
                        value={value}
                        placeholder='Nascimento:'
                        keyboardType="numeric"
                        ref={nascRef}
                    />
                )}
                name="nascimento"
            />
            {errors.nascimento && <Text style={styles.labelErrors}>{errors.nascimento?.message}</Text>}

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
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.Input}
                    placeholder='E-mail:'
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize='none'
                />
                )}
                name="email"
            />
            {errors.email && <Text style={styles.labelErrors}>{errors.email?.message}</Text>}

            <Controller
                control={control}                
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputMask 
                        style={styles.Input}
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        onChangeText={onChange}
                        value={value}
                        placeholder='Telefone:'
                        keyboardType="numeric"
                        ref={numRef}
                    />
                )}
                name="phone"
            />
            {errors.phone && <Text style={styles.labelErrors}>{errors.phone?.message}</Text>}

            <Controller
                control={control}                
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputMask 
                        style={styles.Input}
                        type={'custom'}
                        options={{                            
                            mask: '99.999.999'
                        }}
                        onChangeText={onChange}
                        value={value}
                        placeholder='CEP:'
                        keyboardType="numeric"
                        ref={cepRef}
                    />
                )}
                name="cep"
            />
            {errors.cep && <Text style={styles.labelErrors}>{errors.cep?.message}</Text>}

            <Controller
                control={control}                
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.Input}
                    placeholder='Rua:'
                    onChangeText={onChange}
                    value={value}
                />
                )}
                name="rua"
            />
            {errors.rua && <Text style={styles.labelErrors}>{errors.rua?.message}</Text>}

            <Controller
                control={control}                
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.Input}
                    placeholder='Bairro:'
                    onChangeText={onChange}
                    value={value}
                />
                )}
                name="bairro"
            />
            {errors.bairro && <Text style={styles.labelErrors}>{errors.bairro?.message}</Text>}

            <Controller
                control={control}                
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.Input}
                    placeholder='Cidade:'
                    onChangeText={onChange}
                    value={value}
                />
                )}
                name="cidade"
            />
            {errors.cidade && <Text style={styles.labelErrors}>{errors.cidade?.message}</Text>}

            <Controller
                control={control}                
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputMask 
                        style={{...styles.Input, marginBottom: 20}}
                        type={'custom'}
                        options={{                            
                            mask: 'AA'
                        }}
                        onChangeText={onChange}
                        value={value}
                        placeholder='UF:'
                    />
                )}
                name="uf"
            />
            {errors.uf && <Text style={styles.labelErrors}>{errors.uf?.message}</Text>}


        </ScrollView>
        



      {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.textButton}>Cadastrar</Text>
        </TouchableOpacity>
    </View>
  );
}
