import 'react-native-gesture-handler';

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { GaleriaScreen } from '../screens/galeria/GaleriaScreen';
import { ImagenScreen } from '../screens/galeria/ImagenScreen';

export type GaleriaStackParams = {
    GaleriaScreen: undefined;
    ImagenScreen: ( imageURL: string ) => void;
}

const Stack = createStackNavigator<GaleriaStackParams>();

export const GaleriaNavigator = () => {
  
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
                name="GaleriaScreen" 
                options={ { title: "Home", headerShown: false } } 
                component={ GaleriaScreen } 
            />

            <Stack.Screen 
                name="ImagenScreen" 
                options={ { title: "Home", headerShown: false } } 
                component={ ImagenScreen } 
            />

        </Stack.Navigator>
    )
}