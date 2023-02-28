import React from "react";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import UserNavigation from "./app/navigation/UserNavigation";

export default function App() {

  return<NavigationContainer >
      <StatusBar hidden />      
      <UserNavigation />
    </NavigationContainer>
}
