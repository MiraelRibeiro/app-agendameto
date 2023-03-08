import React, {useState} from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert,  } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import { MaterialIcons } from '@expo/vector-icons';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import ValidarDropDown from "../functions/validations/Valid-DropDown";
import ValidarCadastroAdmin from "../functions/validations/Valid-Adm";
import styles from '../styles/cadastroAdm';

export default CadastroAdmin = () => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(ValidarCadastroAdmin)
    });

    function validacaoCadastro(data){
        if(data.email !='' && data.password != ''){  
            try {
                
                Alert.alert(
                    "Cadastro Realizado",
                    "Dadaos inseridos foram cadastrados com sucesso",
                    [                  
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            } catch (error) {
                Alert.alert(
                    "Erro de cadastro",
                    "Erro ao efetuar cadastro - " + error,
                    [                  
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }         
            
            console.log(data)
        }
        
    }

    const [selectUser, setSelectUser] = useState("");

    const data = [
        {key:'1', value:'Gerente'},
        {key:'2', value:'Auxiliar'},
    ]

    return(
        <View style={styles.container}>
            <View style={styles.iconPerson}>
                <MaterialIcons name="person-add-alt-1" size={150} color="#3333FF" />
            </View>
            <View style={{padding:10, flex: 0.6, justifyContent: 'center'}}>
                <SelectList 
                    boxStyles={styles.selectList}
                    setSelected={(val) => setSelectUser(val)} 
                    data={data} 
                    save="value"
                    placeholder="Tipo usuário:"
                />
                {<ValidarDropDown message="tipo de usuário" value={selectUser}/>}
                 

                <Controller
                    control={control}
                    name='name'
                    render={({ field: {onChange, value } }) => (
                        <TextInput placeholderTextColor={'black'} style={styles.input} placeholder="E-mail:" onChangeText={onChange} defaultValue={value} />
                    )}
                />
                {errors.name && <Text style={styles.labelErrors}>{errors.name?.message}</Text>} 

                <Controller
                    control={control}
                    name='password'
                    render={({ field: {onChange, value } }) => (
                        <TextInput placeholderTextColor={'black'} style={styles.input} placeholder="Senha:" secureTextEntry={true} onChangeText={onChange} defaultValue={value} />
                    )}
                />
                {errors.password && <Text style={styles.labelErrors}>{errors.password?.message}</Text>} 

                <Controller
                    control={control}
                    name='confPassword'
                    render={({ field: {onChange, value } }) => (
                        <TextInput placeholderTextColor={'black'} style={styles.input} placeholder="Conf. Senha:" secureTextEntry={true} onChangeText={onChange} defaultValue={value} />
                    )}
                />
                {errors.confPassword && <Text style={styles.labelErrors}>{errors.confPassword?.message}</Text>} 

            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(validacaoCadastro)}>
                <Text style={styles.textButton}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}

