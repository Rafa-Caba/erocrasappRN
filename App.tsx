import 'react-native-gesture-handler';

import React, { useEffect } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import { MenuLateral } from './src/navigator/MenuLateral';
import { AuthProvider } from './src/context/AuthContext';

import SplashScreen from 'react-native-splash-screen';


const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <NavigationContainer>
      <AuthProvider>
          <MenuLateral />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;