import 'react-native-gesture-handler';

import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';

import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

import { Tabs } from './Tabs';
import { PerfilScreen } from '../screens/ajustesScreens/PerfilScreen';
import { SettingsScreen } from '../screens/ajustesScreens/SettingsScreen';

import { LoginScreen } from '../screens/LoginScreen';
import { RegistroScreen } from '../screens/RegistroScreen';

import { colores, styles } from '../theme/appTheme';
import { LoadingScreen } from '../screens/LoadingScreen';

const Drawer = createDrawerNavigator();

export const MenuLateral = () => {

    const { status } = useContext(AuthContext);
    const { width } = useWindowDimensions();

    if ( status === 'checking' ) return <LoadingScreen />

    return (
        <Drawer.Navigator 
            screenOptions={{ 
                headerShown: false, 
                drawerType: width >= 768 ? 'permanent' : 'front',
                drawerStyle: { width: 250 },
            }}

            drawerContent={ (props) => <MenuInterno { ...props } /> }
        >
            { 
                ( status !== 'authenticated' ) 
                    ? (
                        <>
                            <Drawer.Screen name="LoginScreen" component={ LoginScreen } />
                            <Drawer.Screen name="RegistroScreen" component={ RegistroScreen } />
                        </>
                    ) 
                    : (
                        <>
                            <Drawer.Screen name="Tabs" component={ Tabs } />
                            <Drawer.Screen name="PerfilScreen" options={{ headerShown: true }} component={ PerfilScreen } />
                            <Drawer.Screen name="SettingsScreen" component={ SettingsScreen } />
                        </>
                    )
            }
        </Drawer.Navigator>
    );
}

const MenuInterno = ( { navigation }: DrawerContentComponentProps) => {

    const { user } = useContext(AuthContext);

    return (
        <DrawerContentScrollView>

            {/* Parte del Avatar */}
            <View style={{ ...styles.avatarContainer }}>
                {
                    <Image 
                        // source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' }}
                        source={{ uri: (user?.photoURL) ? user?.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' }}
                        style={ styles.avatar }
                    />
                }
            </View>

            {/* Opciones de Menu  */}
            <View  style={ styles.menuContainer }>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="home" size={ 25 } color={ colores.primary } />
                    <TouchableOpacity 
                        style={{ ...styles.menuBoton, marginLeft: 10 }}
                        onPress={ () => navigation.navigate('Tabs') }
                    >
                        <Text style={ styles.menuTexto} >Home</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="person" size={ 25 } color={ colores.primary } />
                    <TouchableOpacity 
                        style={{ ...styles.menuBoton, marginLeft: 10 }}
                        onPress={ () => navigation.navigate('PerfilScreen') }
                    >
                        <Text style={ styles.menuTexto} >Perfil</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="settings" size={ 25 } color={ colores.primary } />
                    <TouchableOpacity 
                        style={{ ...styles.menuBoton, marginLeft: 10 }}
                        onPress={ () => navigation.navigate('SettingsScreen') }
                    >
                        <Text style={ styles.menuTexto } >Settings</Text>
                    </TouchableOpacity>
                </View>


                
            </View>

        </DrawerContentScrollView>
    );
}