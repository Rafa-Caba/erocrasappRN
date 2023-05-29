import 'react-native-gesture-handler';

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SettingsScreen } from '../screens/ajustesScreens/SettingsScreen';
import { EditarPerfilScreen } from '../screens/ajustesScreens/EditarPerfilScreen';
import { PerfilScreen } from '../screens/ajustesScreens/PerfilScreen';

export type SettingsStackParams = {
    SettingsScreen: undefined;
    EditarPerfilScreen: undefined;
    PerfilScreen: undefined;
}

const Stack = createStackNavigator<SettingsStackParams>();

export const SettingsNavigator = () => {
  
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: 'white'
                },
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent'
                }
            }}
        >

            <Stack.Screen 
                name="SettingsScreen" 
                options={ { title: "Ajustes", headerShown: false } } 
                component={ SettingsScreen } 
            />

            <Stack.Screen 
                name="PerfilScreen" 
                options={ { title: "Perfil" } } 
                component={ PerfilScreen } 
            />
            
            <Stack.Screen 
                name="EditarPerfilScreen" 
                options={ { title: "Editar Perfil" } } 
                component={ EditarPerfilScreen } 
            />

        </Stack.Navigator>
    )
}