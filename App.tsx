import 'react-native-gesture-handler';

import React, { useEffect } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import { MenuLateral } from './src/navigator/MenuLateral';
import { AuthProvider } from './src/context/AuthContext';

import SplashScreen from 'react-native-splash-screen';


const Appstate = ({ children }: any) => {
  return (
    <AuthProvider>
        { children }
    </AuthProvider>
  )
}

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <NavigationContainer>
      <Appstate>
          <MenuLateral />
      </Appstate>
    </NavigationContainer>
  )
}

export default App;