import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "../pages/Login";
import CadastroAdmin from "../pages/CadastroAdm";
import Home from "../pages/Home";
import AppNavigation from "./AppNavigation";
import Cadastro from "../pages/Cadastro";
import Agendamento from "../pages/Agendamento";
import NovoAgendamento from "../pages/NovoAgendamento";
import Configuracoes from "../pages/Configuracoes";
import Cadastros from "../pages/Cadastros";

const Stack = createNativeStackNavigator();

export default UserNavigation = () =>{
    return (
        
        <Stack.Navigator screenOptions={{headerShown: false,}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            {/* <Stack.Screen name="CadastroAdm" component={CadastroAdmin} /> */}
            <Stack.Screen name="Principal" component={AppNavigation} />
            {/* <Stack.Screen name="Cadastro" component={Cadastro} /> */}

            {/* <Stack.Screen name="Agendamentos" component={Agendamento} /> */}

            {/* <Stack.Screen name="Novo Agendamento" component={NovoAgendamento}/> */}

            {/* <Stack.Screen name="Configuracoes" component={Configuracoes}/> */}
        </Stack.Navigator>        
      );
}
