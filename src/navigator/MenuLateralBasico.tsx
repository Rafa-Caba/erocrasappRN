import 'react-native-gesture-handler';

import { useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomeNavigator } from './HomeNavigator';
import { PerfilScreen } from '../screens/ajustesScreens/PerfilScreen';
import { SettingsNavigator } from './SettingsNavigator';

const Drawer = createDrawerNavigator();

export const MenuLateralBasico = () => {

    const { width } = useWindowDimensions();

    return (
        <Drawer.Navigator 
            screenOptions={{
                drawerType: width >= 768 ? 'permanent' : 'front',
            }}
        >
            <Drawer.Screen 
                name="HomeNavigator"
                options={{ title: 'Home' }} 
                component={ HomeNavigator } 
            />

            <Drawer.Screen 
                name="PerfilScreen"
                options={{ title: 'Perfil' }} 
                component={ PerfilScreen } 
            />

            <Drawer.Screen 
                name="SettingsNavigator"
                options={{ title: 'Settings' }} 
                component={ SettingsNavigator } 
            />
        </Drawer.Navigator>
    );
}