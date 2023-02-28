import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../screens/Login";
import CadastroAdmin from "../screens/CadastroAdm";
import Home from "../screens/Home";
import AppNavigation from "./AppNavigation";

const Stack = createNativeStackNavigator();

export default UserNavigation = () =>{
    return (
        <Stack.Navigator screenOptions={{headerShown: false,}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={CadastroAdmin} />
            <Stack.Screen name="Principal" component={AppNavigation} />
        </Stack.Navigator>        
      );
}
