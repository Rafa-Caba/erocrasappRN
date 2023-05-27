import 'react-native-gesture-handler';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import { MenuLateral } from './src/navigator/MenuLateral';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {

  return (
    <NavigationContainer>
      <AuthProvider>
          <MenuLateral />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;