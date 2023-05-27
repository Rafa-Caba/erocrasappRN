import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';

import { PerfilScreen } from '../screens/ajustesScreens/PerfilScreen';
import { SettingsScreen } from '../screens/ajustesScreens/SettingsScreen';
import { HomeNavigator } from './HomeNavigator';

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
                name="StackNavigator"
                options={{ title: 'Home' }} 
                component={ HomeNavigator } 
            />

            <Drawer.Screen 
                name="PerfilScreen"
                options={{ title: 'Perfil' }} 
                component={ PerfilScreen } 
            />

            <Drawer.Screen 
                name="SettingsScreen"
                options={{ title: 'Settings' }} 
                component={ SettingsScreen } 
            />
        </Drawer.Navigator>
    );
}