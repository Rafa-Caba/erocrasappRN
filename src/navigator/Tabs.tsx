import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { colores } from '../theme/appTheme';
import { Platform } from 'react-native';

import MensajesScreen from '../screens/mensajes/MensajesScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { MisaCantosNavigator } from './MisaCantosNavigator';
import { HomeNavigator } from './HomeNavigator';
import { GaleriaNavigator } from './GaleriaNavigator';
import { SettingsNavigator } from './SettingsNavigator';

export const Tabs = () => {
  
  return Platform.OS === 'ios'
          ? <TabsIOS />
          : <TabsAndroid />  
}

const BottomTabAndroid = createMaterialBottomTabNavigator();

const TabsAndroid = () => {
  return (
    <BottomTabAndroid.Navigator
      // sceneAnimationEnabled={ true }
      // shifting={ true }
      barStyle={{
        backgroundColor: '#8B4BFF',
        margin: 0,
      }}
      activeColor='white'
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'blue',
        tabBarStyle: {
          borderTopColor: colores.primary,
          borderTopWidth: 0,
          elevation: 0,
        },
        labeled: false,
        tabBarIcon: ({ color, focused }) => {
          let iconName: string = '';
          switch(route.name) {
            case 'HomeNavigator':
                iconName = focused ? 'home-outline' : 'home'
            break;

            case 'MensajesScreen':
                iconName = 'chatbubble-ellipses'
            break;

            case 'CantosScreen':
                iconName = 'musical-notes'
            break;

            case 'MisaCantosNavigator':
                iconName = 'list'
            break;

            case 'GaleriaNavigator':
                iconName = 'images'
            break;

            case 'SettingsNavigator':
                iconName = 'settings-sharp'
            break;
          }
          
          return <Icon name={ iconName } size={ 25 } color={ 'white' } />
        },
      })}
    >
      <BottomTabAndroid.Screen name="HomeNavigator" options={{ title: 'Home' }} component={ HomeNavigator } />
      <BottomTabAndroid.Screen name="MensajesScreen" options={{ title: 'Chat' }} component={ MensajesScreen } />
      <BottomTabAndroid.Screen name="MisaCantosNavigator" options={{ title: 'Lista de Misas' }} component={ MisaCantosNavigator } />
      <BottomTabAndroid.Screen name="GaleriaNavigator" options={{ title: 'Galeria' }} component={ GaleriaNavigator } />
      <BottomTabAndroid.Screen name="SettingsNavigator" options={{ title: 'Ajustes' }} component={ SettingsNavigator } />
    </BottomTabAndroid.Navigator>
  );
}


const BottomTabIOS = createBottomTabNavigator();

const TabsIOS = () => {
  return (
    <BottomTabIOS.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colores.primary,
        tabBarStyle: {
          borderTopColor: colores.primary,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 15
        },
        tabBarIcon: ({ color }) => {
          let iconName: string = '';
          switch(route.name) {
            case 'HomeNavigator':
                iconName = 'home'
            break;

            case 'MensajesScreen':
                iconName = 'chatbubble-ellipses'
            break;

            case 'CantosScreen':
                iconName = 'musical-notes'
            break;

            case 'MisaCantosNavigator':
                iconName = 'list'
            break;

            case 'GaleriaNavigator':
                iconName = 'images'
            break;

            case 'SettingsNavigator':
                iconName = 'settings-sharp'
            break;
          }
          
          return <Icon name={ iconName } size={ 25 } color={ 'white' } />
        },
      })}
    >
      <BottomTabIOS.Screen name="HomeNavigator" options={{ title: 'Home' }} component={ HomeNavigator } />
      <BottomTabIOS.Screen name="MensajesScreen" options={{ title: 'Chat' }} component={ MensajesScreen } />
      <BottomTabIOS.Screen name="MisaCantosNavigator" options={{ title: 'Lista de Misas' }} component={ MisaCantosNavigator } />
      <BottomTabIOS.Screen name="GaleriaNavigator" options={{ title: 'Galeria' }} component={ GaleriaNavigator } />
      <BottomTabIOS.Screen name="SettingsNavigator" options={{ title: 'Ajustes' }} component={ SettingsNavigator } />
    </BottomTabIOS.Navigator>
  );
}