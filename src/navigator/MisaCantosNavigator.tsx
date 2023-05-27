import 'react-native-gesture-handler';

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MisaCantosScreen } from '../screens/misasScreens/MisaCantosScreen';
import MisaFormScreen from '../screens/misasScreens/MisaFormScreen';
import { ListaMisasScreen } from '../screens/misasScreens/ListaMisasScreen';
import CantoFormScreen from '../screens/misasScreens/CantoFormScreen';
import { CantoScreen } from '../screens/misasScreens/CantoScreen';


export type MisaCantosStackParams = {
    ListaMisasScreen: undefined;
    MisaCantosScreen: { nombreMisa: string };
    CantoFormScreen: { nombreMisa: string };
    CantoScreen: { tituloCanto: string, letraCanto: string };
    MisaFormScreen: undefined;
}

const Stack = createStackNavigator<MisaCantosStackParams>();

export const MisaCantosNavigator = () => {
  
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

            <Stack.Screen name="ListaMisasScreen" options={ { headerShown: false } } component={ ListaMisasScreen } />
            <Stack.Screen name="MisaCantosScreen" options={ { headerShown: false } } component={ MisaCantosScreen } />
            <Stack.Screen name="MisaFormScreen" options={ { headerShown: false } } component={ MisaFormScreen } />
            <Stack.Screen name="CantoScreen" options={ { title: "Canto" } } component={ CantoScreen } />
            <Stack.Screen name="CantoFormScreen" options={ { headerShown: false } } component={ CantoFormScreen } />

        </Stack.Navigator>
    )
}