import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';

import Cadastro from "../pages/Cadastro";
import Agendamento from "../pages/Agendamento";
import NovoAgendamento from "../pages/NovoAgendamento";
import Configuracoes from "../pages/Configuracoes";

const Tab = createBottomTabNavigator();

export default AppNavigator = ({token, userData}) => {
    
    // criar validação por usuario -> se for medico mostrar telas de Meus Agendamentos e Minhas Informações, se for a "clinica" mostrar as demais informações

    return<Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'white',
            tabBarActiveBackgroundColor: '#3333FF',
            tabBarStyle: {
                backgroundColor:'#000066', 
                borderTopColor: 'transparent', 
                marginBottom: 2
            },
        }}
    >

        <Tab.Screen name="Cadastro" component={Cadastro} initialParams={{token}} options={{
            tabBarIcon: ({color, size}) => (
                <MaterialIcons name="person-add" size={30} color={color} />
            )
        }} />

        <Tab.Screen name="Agendamentos" component={Agendamento} initialParams={{token}} options={{
            tabBarIcon: ({color, size}) => (
                <FontAwesome5 name="clipboard-list" size={30} color={color}  />
            )
        }} />

        <Tab.Screen name="Novo Agendamento" component={NovoAgendamento} initialParams={{token}} options={{
            tabBarIcon: ({color, size}) => (
                <MaterialIcons name="post-add" size={30} color={color} />
            )
        }} />

        <Tab.Screen name="Configuracoes" component={Configuracoes} initialParams={{token}} options={{
            tabBarIcon: ({color, size}) => (
                <FontAwesome name="gear" size={30} color={color} />
            )
        }} />

    </Tab.Navigator>
}