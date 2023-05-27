import 'react-native-gesture-handler';

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/HomeScreen';
import NoticiaFormScreen from '../screens/noticiasScreens/NoticiaFormScreen';
import { NoticiaScreen } from '../screens/noticiasScreens/NoticiaScreen';

export type HomeStackParams = {
    HomeScreen: undefined, 
    NoticiaScreen: { time: string, post: string, autor: string };
    NoticiaFormScreen: undefined;
}

const Stack = createStackNavigator<HomeStackParams>();

export const HomeNavigator = () => {
  
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
                name="HomeScreen" 
                options={ { title: "Home", headerShown: false } } 
                component={ HomeScreen } 
            />
            
            <Stack.Screen 
                name="NoticiaScreen" 
                options={ { title: "Aviso" } } 
                component={ NoticiaScreen } 
            />

            <Stack.Screen 
                name="NoticiaFormScreen" 
                options={ { title: "Agregar Aviso" } } 
                component={ NoticiaFormScreen } 
            />

        </Stack.Navigator>
    )
}
